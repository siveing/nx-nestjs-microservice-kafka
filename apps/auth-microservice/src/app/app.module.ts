import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersRepository } from './users.repository';
import { JwtModule } from "@nx-nestjs-microservices/shared/lib"

@Module({
  imports: [
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService, UsersRepository],
})
export class AppModule { }
