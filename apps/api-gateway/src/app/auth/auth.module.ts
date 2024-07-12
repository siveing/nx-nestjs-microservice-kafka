// apps/api-gateway/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@nx-nestjs-microservices/shared/lib"

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_MICROSERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'auth',
                        brokers: ['localhost:29092'],
                    },
                    producerOnlyMode: true,
                    consumer: {
                        groupId: 'auth-consumer',
                    },
                },
            },
        ]),
        JwtModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { } 