// apps/api-gateway/src/payment/payments.module.ts

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PAYMENT_MICROSERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'payment' + Math.floor(Math.random() * 1000),
                        brokers: ['localhost:29092'],
                    },
                    consumer: {
                        groupId: '1-payment',
                    },
                },
            },
        ]),
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService, ClientsModule],
})
export class PaymentModule { }