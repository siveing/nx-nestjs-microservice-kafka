import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepo: Repository<Payment>
    ) { }

    async createPayment(payment: Payment): Promise<Payment> {
        const paymentData = this.paymentRepo.create(payment);
        return await this.paymentRepo.save(paymentData);
    }

    async getPayment(id: number): Promise<Payment> {
        return await this.paymentRepo.findOne({ where: { id } });
    }
}