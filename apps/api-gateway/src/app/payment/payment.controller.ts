// apps/api-gateway/src/payment/payment.controller.ts

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MakePaymentDto } from '@nx-nestjs-microservices/shared/dto';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  makePayment(@Body(ValidationPipe) makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}