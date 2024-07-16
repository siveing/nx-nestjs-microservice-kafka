/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app/app.module";

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
          groupId: 'auth-consumer',
          // sessionTimeout: 15000,
          // retry: {
          //   maxRetryTime: 2
          // }
        },
      },
    }
  );
  await app.listen();
}
bootstrap();
