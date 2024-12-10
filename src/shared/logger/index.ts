import pino from 'pino';
import {pinoHttp} from 'pino-http';

const logger: pino.Logger = pino();

const loggerMiddleware = pinoHttp({
  logger,
});

export {logger, loggerMiddleware};
