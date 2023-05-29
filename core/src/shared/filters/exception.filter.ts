import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const defaultError = {
      statusCode: 500,
      message: 'Internal Server Error',
    };
    const error: any = exception.getError() || defaultError;
    response.status(error.statusCode).json(error);
  }
}
