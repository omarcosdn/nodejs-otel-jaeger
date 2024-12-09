import {JokeRepository} from 'src/core/repositories/joke';
import {UUID} from '@shared/core';
import {Joke} from 'src/core/entities/joke';
import {inject, injectable} from 'tsyringe';
import {DatabaseConnection} from '@infrastructure/adapters/database';
import {InjectableToken} from '@shared/types';

@injectable()
export class JokeRepositoryPostgresAdapter implements JokeRepository {
  constructor(@inject(InjectableToken.DATABASE_CONNECTION) private readonly db: DatabaseConnection) {}

  async save(entity: Joke): Promise<void> {
    const query = 'INSERT INTO public.joke (id, description, joke_id) VALUES ($1, $2, $3)';

    const {id, description, jokeId} = entity.serialize();
    const values = [id.toString(), description, jokeId];

    await this.db.query(query, values);
  }

  async findById(id: UUID): Promise<Joke | undefined> {
    const query = 'SELECT * FROM public.joke WHERE id = $1';

    const [result] = await this.db.query<JokeData>(query, [id]);
    if (!result) {
      return undefined;
    }

    return Joke.restore({
      id: result.id,
      description: result.description,
      jokeId: Number(result.jokeId),
    });
  }
}

type JokeData = {
  id: string;
  description: string;
  jokeId: number;
};
