import {injectable} from 'tsyringe';
import {HttpStatus, RestController, RestRequest, RestResponse} from '@infrastructure/types';
import {PubUseCase} from '@core/usecases/pubsub';

@injectable()
export class PubController implements RestController<string> {
  constructor(private readonly useCase: PubUseCase) {}

  async handle(req: RestRequest): Promise<RestResponse<string>> {
    await this.useCase.execute({
      description: req.body.description,
    });

    return {
      status: HttpStatus.OK,
      content: 'OK',
    };
  }
}
