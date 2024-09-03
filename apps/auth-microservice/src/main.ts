/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app/app.module";

import { AppExceptionFilter, RpcExceptionFilter } from '@core/shared/filter';
import { GlobalInterceptors } from '@core/shared/interceptor';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: '1-auth',
          // sessionTimeout: 15000,
          // retry: {
          //   maxRetryTime: 2
          // }
        },
      },
    }
  );

  // REGISTER GLOBAL PIPES
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );

  // REGISTER FILTER
  app.useGlobalFilters(
    new AppExceptionFilter(),
    new RpcExceptionFilter()
  );

  // REGISTER GLOBAL INTERCEPTORS
  app.useGlobalInterceptors(new GlobalInterceptors());

  await app.listen();
}
bootstrap();
