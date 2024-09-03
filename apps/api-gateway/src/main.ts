/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { AppExceptionFilter, RpcExceptionFilter } from '@core/shared/filter';
import { GlobalInterceptors } from '@core/shared/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // REGISTER GLOBAL PIPES
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
      errorHttpStatusCode: 422,
    }),
  );

  // REGISTER FILTER
  app.useGlobalFilters(
    new AppExceptionFilter()
  );

  // REGISTER GLOBAL INTERCEPTORS
  app.useGlobalInterceptors(new GlobalInterceptors());

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
