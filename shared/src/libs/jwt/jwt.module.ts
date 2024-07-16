import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Global()
@Module({
  exports: [NestJwtModule],
  imports: [
    NestJwtModule.registerAsync({
      useFactory: async () => {
        console.log("=============== JWT MODULE ", process.env.JWT_SECRET);
        return ({ secret: process.env.JWT_SECRET })
      }
    })
  ]
})
export class JwtModule { }
