// libs/shared/src/lib/dto/make-payment.dto.ts

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MakePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}

export class GetPaymentDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

