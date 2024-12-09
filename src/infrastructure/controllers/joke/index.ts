import {injectable} from 'tsyringe';
import {HttpStatus, RestController, RestRequest, RestResponse} from '@infrastructure/types';
import {GetJokeUseCase} from 'src/core/usecases/joke';
import {JokeProps} from '@core/entities/joke';

@injectable()
export class GetJokeController implements RestController<JokeProps> {
  constructor(private readonly useCase: GetJokeUseCase) {}

  async handle(req: RestRequest): Promise<RestResponse<JokeProps>> {
    const res = await this.useCase.execute({
      jokeId: Number(req.params.jokeId),
    });

    return {
      status: HttpStatus.OK,
      content: {
        ...res,
      },
    };
  }
}
