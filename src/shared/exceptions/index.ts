import {HttpStatus} from '@infrastructure/types';

export type ErrorOptions = {
  statusCode?: HttpStatus;
  cause?: Error;
  metadata?: unknown;
};

export type ErrorResponse = {
  status: HttpStatus;
  content: {
    message: string;
    metadata?: unknown;
  };
};

export abstract class BaseException extends Error {
  public readonly statusCode: HttpStatus;
  public readonly cause?: Error;
  public readonly metadata?: unknown;

  protected constructor(message: string, options: ErrorOptions) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = options.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
    this.cause = options.cause;
    this.metadata = options.metadata;
    Error.captureStackTrace(this, this.constructor);
  }

  public toResponse(): ErrorResponse {
    return {
      status: this.statusCode,
      content: {
        message: this.message,
        metadata: this.metadata,
      },
    };
  }
}

export class DomainException extends BaseException {
  constructor(message: string = 'BusinessError', options: ErrorOptions = {}) {
    super(message, {
      ...options,
      statusCode: options.statusCode ?? HttpStatus.BAD_REQUEST,
    });
    this.name = this.constructor.name;
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string = 'NotFound', options: ErrorOptions = {}) {
    super(message, {
      ...options,
      statusCode: options.statusCode ?? HttpStatus.NOT_FOUND,
    });
    this.name = this.constructor.name;
  }
}

export class WebException extends BaseException {
  constructor(message: string = 'InternalServerError', options: ErrorOptions = {}) {
    super(message, {
      ...options,
      statusCode: options.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    });
    this.name = this.constructor.name;
  }
}
