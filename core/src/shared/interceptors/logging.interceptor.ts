import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { ip, method, path: url } = context.switchToHttp().getRequest();

    this.logger.log(
      `${method} ${url} ${ip}: ${context.getClass().name} ${
        context.getHandler().name
      }`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;

        this.logger.log(
          `${method} ${url} ${statusCode} - ${ip}: ${Date.now() - now}ms`,
        );
        this.logger.debug('Response:', res);
      }),
      catchError((err) => {
        this.logger.error(err);
        return throwError(() => err);
      }),
    );
  }
}
