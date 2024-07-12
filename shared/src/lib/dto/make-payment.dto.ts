// libs/shared/src/lib/dto/make-payment.dto.ts

import { IsNotEmpty, IsNumber } from 'class-validator';

export class MakePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}