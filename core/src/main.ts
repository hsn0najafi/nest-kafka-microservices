import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

const configService: ConfigService = new ConfigService();

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`\n---------=+ Core is Running +=---------\n`);
})();
