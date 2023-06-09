import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { setupDocument } from './document';
import { LoggingInterceptor } from './shared/interceptors';
import { RpcExceptionFilter } from './shared/filters';

const configService: ConfigService = new ConfigService();

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(configService.get<string>('APIsPath'));
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new RpcExceptionFilter());
  app.use(compression());
  app.use(helmet());

  const isDevMode = configService.get<string>('NODE_ENV') == 'dev';
  const swaggerPath = configService.get<string>('DocsPath');
  isDevMode && setupDocument(app, swaggerPath);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`\n---------=+ Core is Running +=---------\n`);
})();
