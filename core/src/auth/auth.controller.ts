import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  // Version,
  // VERSION_NEUTRAL,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { RegisterDto } from './dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly client: ClientKafka,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: RegisterDto): Observable<any> {
    return this.client.send('register', { body: registerDto }).pipe(
      timeout(400),
      catchError((err) => throwError(() => new RpcException(err.response))),
    );
  }
}
