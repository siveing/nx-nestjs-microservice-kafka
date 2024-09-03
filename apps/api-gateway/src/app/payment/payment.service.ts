// apps/api-gateway/src/payment/payment.service.ts

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePaymentDto, GetPaymentDto, MakePaymentDto } from '@core/shared/dto';
import { firstValueFrom, timeout } from 'rxjs';

import * as C from '@core/shared/constant';

@Injectable()
export class PaymentService implements OnModuleInit {
    constructor(
        @Inject('PAYMENT_MICROSERVICE') private readonly paymentClient: ClientKafka
    ) { }

    // EVENT
    makePayment(makePaymentDto: MakePaymentDto) {
        this.paymentClient.emit('process_payment', JSON.stringify(makePaymentDto));
    }


    // ===================================================
    // MESSAGE
    // ===================================================

    async createPayment(payment: CreatePaymentDto) {
        return await firstValueFrom(this.paymentClient.send(C.PAYMENT_MESSAGE_PATTERN.CREATE_PAYMENT, JSON.stringify(payment)).pipe(timeout(10000)));
    }

    async getPayment(payload: GetPaymentDto) {
        return await firstValueFrom(this.paymentClient.send(C.PAYMENT_MESSAGE_PATTERN.DETAIL_PAYMENT, JSON.stringify(payload)).pipe(timeout(10000)));
    }


    async onModuleInit() {
        this.paymentClient.subscribeToResponseOf(C.PAYMENT_MESSAGE_PATTERN.CREATE_PAYMENT);
        this.paymentClient.subscribeToResponseOf(C.PAYMENT_MESSAGE_PATTERN.DETAIL_PAYMENT);
        await this.paymentClient.connect();
    }
}