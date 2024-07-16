// ENV
import 'dotenv/config';

import { Module } from '@nestjs/common';

import { JwtModule } from "@core/shared/lib";
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import environments from './config/environments';
import { AuthModule } from './module/auth/auth.module';
import { ENTITIES, UserModule } from './module/user/user.module';

@Module({
  imports: [
    // REGISTER CONFIG
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env.local',
      load: [config],
      isGlobal: true,
    }),

    PassportModule,

    // REGISTER TYPEORM
    TypeOrmModule.forRootAsync({
      useFactory: () =>{
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

    // REGISTER JWT
    JwtModule,

    // REGISTER USER AND AUTH
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [JwtModule, ConfigModule, PassportModule],
})
export class AppModule { }
