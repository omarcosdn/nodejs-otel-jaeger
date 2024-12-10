import {container} from 'tsyringe';
import {InjectableToken} from '@shared/types';
import {PgPromiseAdapter} from '@infrastructure/adapters/database';
import {GetJokeUseCase} from 'src/core/usecases/joke';
import {JokeRepositoryPostgresAdapter} from '@infrastructure/adapters/repositories/joke';
import {JokeApiGatewayAdapter} from '@infrastructure/adapters/gateways/joke';
import {PubUseCase} from '@core/usecases/pubsub';

container.registerSingleton(InjectableToken.DATABASE_CONNECTION, PgPromiseAdapter);

container.register(InjectableToken.JOKE_REPOSITORY, {
  useClass: JokeRepositoryPostgresAdapter,
});

container.register(InjectableToken.JOKE_API_GATEWAY, {
  useClass: JokeApiGatewayAdapter,
});

container.register(InjectableToken.GET_JOKE_USE_CASE, {
  useClass: GetJokeUseCase,
});

container.register(InjectableToken.PUB_USE_CASE, {
  useClass: PubUseCase,
});
