import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";

import * as C from '@core/shared/constant'
import { PaymentService } from "./payment.service";

@Controller({
    path: 'payment',
    version: '1'
})
export class PaymentController {
    constructor() { }

}

// MESSAGE PATTERN
@Controller()
export class PaymentMessagePattern {
    constructor(private readonly paymentService: PaymentService) { }

    @MessagePattern(C.PAYMENT_MESSAGE_PATTERN.CREATE_PAYMENT)
    createPayment(@Payload() message: any) {
        console.log("create payment message", message);
        return this.paymentService.createPayment(message);
    }

    @MessagePattern(C.PAYMENT_MESSAGE_PATTERN.DETAIL_PAYMENT)
    detailPayment(@Payload() message: any) {
        console.log("detail payment message", message);
    }
}

// EVENT PATTERN
@Controller()
export class PaymentEventPattern {
    constructor() { }

    @EventPattern(C.PAYMENT_EVENT_PATTERN.CREATE_PAYMENT)
    createPayment(@Payload() message: any) {
        console.log("create payment event", message);
    }
}