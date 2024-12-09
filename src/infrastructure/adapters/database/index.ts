import {injectable} from 'tsyringe';
import pgp from 'pg-promise';
import {Env} from '@infrastructure/configurations';

export interface DatabaseConnection {
  query<T>(statement: string, params: unknown): Promise<T[]>;
}

@injectable()
export class PgPromiseAdapter implements DatabaseConnection {
  private readonly db: any;

  constructor() {
    this.db = pgp()(
      `postgres://${Env.DATABASE_USER}:${Env.DATABASE_PASSWORD}@${Env.DATABASE_HOST}:${Env.DATABASE_PORT}/${Env.DATABASE_NAME}`
    );
  }

  async query<T>(statement: string, params: any[]): Promise<T[]> {
    return this.db?.query(statement, params);
  }
}
