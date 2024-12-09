import {container} from 'tsyringe';
import {InjectableToken} from '@shared/types';
import {PgPromiseAdapter} from '@infrastructure/adapters/database';
import {CreateJokeUseCase} from 'src/core/usecases/joke';
import {JokeRepositoryPostgresAdapter} from '@infrastructure/adapters/repositories/joke';

container.registerSingleton(InjectableToken.DATABASE_CONNECTION, PgPromiseAdapter);

container.register(InjectableToken.JOKE_REPOSITORY, {
  useClass: JokeRepositoryPostgresAdapter,
});

container.register(InjectableToken.CREATE_JOKE_USE_CASE, {
  useClass: CreateJokeUseCase,
});
