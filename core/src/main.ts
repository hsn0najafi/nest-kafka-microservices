import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { setupDocument } from './document';

const configService: ConfigService = new ConfigService();

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(configService.get<string>('APIsPath'));
  app.enableVersioning({ type: VersioningType.URI });
  app.use(compression());
  app.use(helmet());

  const isDevMode = configService.get<string>('NODE_ENV') == 'dev';
  const swaggerPath = configService.get<string>('DocsPath');
  isDevMode && setupDocument(app, swaggerPath);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`\n---------=+ Core is Running +=---------\n`);
})();
