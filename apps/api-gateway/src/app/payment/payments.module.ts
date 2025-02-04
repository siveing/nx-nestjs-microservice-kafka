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
                        clientId: 'payment',
                        brokers: ['kafka-learn:9092'],
                    },
                    consumer: {
                        groupId: 'payment-consumer',
                    },
                },
            },
        ]),
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule { }