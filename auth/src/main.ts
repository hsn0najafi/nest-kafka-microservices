import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

const configService: ConfigService = new ConfigService();

(async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: configService.get('KAFKA_BROKERS').split(','),
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
    },
  );
  await app.listen();
  console.log(`\n---------=+ Auth is Running +=---------\n`);
})();
