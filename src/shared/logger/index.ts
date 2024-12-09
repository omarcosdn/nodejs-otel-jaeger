import pino from 'pino';
import {pinoHttp} from 'pino-http';
import {context, trace} from '@opentelemetry/api';

const logger: pino.Logger = pino({
  level: 'info',
  hooks: {
    logMethod(inputArgs, method) {
      const activeSpan = trace.getSpan(context.active());
      if (activeSpan) {
        activeSpan.addEvent('log', {
          level: inputArgs[0],
          message: inputArgs.slice(1).join(' '),
        });
      }
      return method.apply(this, inputArgs);
    },
  },
});

const loggerMiddleware = pinoHttp({
  logger,
});

export {logger, loggerMiddleware};
