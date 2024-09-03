import { Module } from "@nestjs/common";
import { PaymentController, PaymentEventPattern, PaymentMessagePattern } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { Payment } from "./payment.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

export const ENTITIES = [Payment];

@Module({
    imports: [TypeOrmModule.forFeature(ENTITIES)],
    controllers: [
        PaymentController,
        PaymentMessagePattern,
        PaymentEventPattern
    ],
    providers: [PaymentService],
    exports: [PaymentService]

})
export class PaymentModule { }