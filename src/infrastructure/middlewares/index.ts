import {NextFunction, Request, Response} from 'express';
import {HttpStatus} from '@infrastructure/types';
import {BaseException, NotFoundException} from '@shared/exceptions';
import {logger} from '@shared/logger';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof BaseException) {
    logger.error(`${err.name} - Error: ${err.message}`);

    res.status(err.statusCode).json(err.toResponse());
    return;
  }

  logger.error(`An unknown server error has occurred. Error: ${err.message}`);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    content: {
      message: 'An unknown server error has occurred.',
    },
  });
}

export function routeNotFound(req: Request, res: Response, next: NextFunction): void {
  return next(new NotFoundException(`Cannot ${req.method} ${req.originalUrl}`));
}
