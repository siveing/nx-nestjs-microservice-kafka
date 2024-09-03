// apps/api-gateway/src/payment/payment.controller.ts

import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { GetPaymentDto, MakePaymentDto } from '@core/shared/dto';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  makePayment(@Body(ValidationPipe) makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }

  @Get('/:id')
  getPayment(@Body(ValidationPipe) getPaymentDto: GetPaymentDto) {
    return this.paymentService.getPayment(getPaymentDto);
  }
}