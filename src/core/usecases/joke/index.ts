import {ExecutableUseCase} from '@shared/core';
import {inject, injectable} from 'tsyringe';
import {InjectableToken} from '@shared/types';
import {CreateJokeProps, Joke, JokeProps} from '@core/entities/joke';
import {JokeRepository} from '@core/repositories/joke';

@injectable()
export class CreateJokeUseCase implements ExecutableUseCase<CreateJokeProps, JokeProps> {
  constructor(@inject(InjectableToken.JOKE_REPOSITORY) private repository: JokeRepository) {}

  async execute(input: CreateJokeProps): Promise<JokeProps> {
    const entity = Joke.create(input);

    await this.repository.save(entity);

    return entity.serialize();
  }
}
