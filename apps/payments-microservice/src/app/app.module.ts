import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENTITIES, PaymentModule } from './payment/payment.module';

// ENV
import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';
import environments from './config/environments';
import config from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // REGISTER CONFIG
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env.local',
      load: [config],
      isGlobal: true,
    }),

    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),

    // REGISTER TYPEORM
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mysql',
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT) || 3306,
          username: process.env.DB_USERNAME || '',
          password: process.env.DB_PASSWORD || '',
          database: process.env.DB_SCHEMA || '',
          entities: ENTITIES,
          synchronize: true
        }
      }
    }),

    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }