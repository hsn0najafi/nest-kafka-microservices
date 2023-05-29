import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly client: ClientKafka,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const jwt = req.headers.authorization?.split(' ')[1];

    try {
      const isAuthenticated = await lastValueFrom(
        this.client
          .send<string | object>('isAuthenticated', { body: jwt })
          .pipe(timeout(400)),
      );

      if (isAuthenticated === 'no') {
        return false;
      }

      req.user = isAuthenticated;
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
