import {injectable} from 'tsyringe';
import {HttpStatus, RestController, RestRequest, RestResponse} from '@infrastructure/types';
import {CreateJokeUseCase} from 'src/core/usecases/joke';
import {JokeProps} from '@core/entities/joke';

@injectable()
export class CreateJokeController implements RestController<JokeProps> {
  constructor(private readonly useCase: CreateJokeUseCase) {}

  async handle(req: RestRequest): Promise<RestResponse<JokeProps>> {
    const res = await this.useCase.execute({
      description: req.body.description,
      jokeId: Number(req.body.joke_id),
    });

    return {
      status: HttpStatus.CREATED,
      content: {
        ...res,
      },
    };
  }
}
