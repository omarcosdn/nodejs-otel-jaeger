import {ExecutableUseCase} from '@shared/core';
import {inject, injectable} from 'tsyringe';
import {InjectableToken} from '@shared/types';
import {GetJokeProps, Joke, JokeProps} from '@core/entities/joke';
import {JokeRepository} from '@core/repositories/joke';
import {JokeApiGateway} from '@core/gateways/joke';
import {logger} from '@shared/logger';
import {NotFoundException} from '@shared/exceptions';

@injectable()
export class GetJokeUseCase implements ExecutableUseCase<GetJokeProps, JokeProps> {
  constructor(
    @inject(InjectableToken.JOKE_API_GATEWAY) private gateway: JokeApiGateway,
    @inject(InjectableToken.JOKE_REPOSITORY) private repository: JokeRepository
  ) {}

  async execute(input: GetJokeProps): Promise<JokeProps> {
    const jokeFromDatabase = await this.repository.findByJokeId(input.jokeId);
    if (jokeFromDatabase) {
      logger.info(`joke ${input.jokeId} retrieved from database`);
      return jokeFromDatabase.serialize();
    }

    const jokeFromApi = await this.gateway.findByJokeId(input.jokeId);

    if (!jokeFromApi) {
      throw new NotFoundException(`cannot find joke with id ${input.jokeId}`);
    }

    const entity = Joke.create({
      jokeId: jokeFromApi.id,
      description: jokeFromApi.joke,
    });

    await this.repository.save(entity);

    logger.info(`joke ${input.jokeId} retrieved from jokeapi and saved in database`);

    return entity.serialize();
  }
}
