import env from 'env-var';

export const Env = {
  SERVER_BASE_ROUTE: env.get('SERVER_BASE_ROUTE').required(true).asString(),
  SERVER_PORT: env.get('SERVER_PORT').default(3000).asInt(),
  DATABASE_HOST: env.get('DATABASE_HOST').required(true).asString(),
  DATABASE_PORT: env.get('DATABASE_PORT').required(true).asString(),
  DATABASE_USER: env.get('DATABASE_USER').required(true).asString(),
  DATABASE_PASSWORD: env.get('DATABASE_PASSWORD').required(true).asString(),
  DATABASE_NAME: env.get('DATABASE_NAME').required(true).asString(),
};
