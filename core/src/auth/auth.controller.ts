import {
  Controller,
  Inject,
  // Version,
  // VERSION_NEUTRAL,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly client: ClientKafka,
  ) {}
}
