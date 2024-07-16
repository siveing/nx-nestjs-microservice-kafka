import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from "@core/shared/lib";
import { AuthModule } from './module/auth/auth.module';
import { ENTITIES, UserModule } from './module/user/user.module';

@Module({
  imports: [
    // REGISTER TYPEORM
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'jincuteboi',
        database: 'nx-micro',
        synchronize: true,
        logging: false,
        entities: [...ENTITIES],
      }),
    }),

    // REGISTER JWT
    JwtModule,

    // REGISTER USER AND AUTH
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [JwtModule],
})
export class AppModule { }
