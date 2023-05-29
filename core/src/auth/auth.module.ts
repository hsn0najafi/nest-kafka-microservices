import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { logLevel } from 'kafkajs';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_MICROSERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: configService.get('KAFKA_BROKERS').split(','),
              clientId: configService.get('KAFKA_CLIENT_ID'),
              logLevel: logLevel.ERROR,
              connectionTimeout: 1000,
            },
            consumer: {
              groupId: configService.get('KAFKA_GROUP_ID'),
              heartbeatInterval: 1000,
              maxWaitTimeInMs: 1000,
              rebalanceTimeout: 1000,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }
}
