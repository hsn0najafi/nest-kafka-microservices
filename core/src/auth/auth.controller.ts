import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  // Version,
  // VERSION_NEUTRAL,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { catchError, Observable, throwError, timeout } from 'rxjs';

import { UserId } from 'src/shared/decorators';
import { AuthGuard } from 'src/shared/guards';
import { LoginDto, RegisterDto } from './dto';

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

  // @Version('2')
  // @Version(VERSION_NEUTRAL)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto): Observable<any> {
    return this.client.send('login', { body: loginDto }).pipe(
      timeout(400),
      catchError((err) => throwError(() => new RpcException(err.response))),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  me(@UserId() userId): Observable<any> {
    return this.client.send('me', { body: userId }).pipe(
      timeout(400),
      catchError((err) => throwError(() => new RpcException(err.response))),
    );
  }
}
