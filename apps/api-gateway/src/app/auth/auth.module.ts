// apps/api-gateway/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@core/shared/lib"
import { PaymentModule } from '../payment/payments.module';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_MICROSERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'auth' + Math.floor(Math.random() * 1000),
                        brokers: ['localhost:29092'],
                    },
                    // producerOnlyMode: true,
                    consumer: {
                        groupId: '1-auth',
                    },
                },
            },
        ]),
        PaymentModule,
        JwtModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { } 