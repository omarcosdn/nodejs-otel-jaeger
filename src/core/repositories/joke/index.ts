import {Joke} from 'src/core/entities/joke';
import {UUID} from '@shared/core';

export interface JokeRepository {
  save(entity: Joke): Promise<void>;

  findById(id: UUID): Promise<Joke | undefined>;
}
