// apps/api-gateway/src/auth/auth.service.ts

import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto, SignInDto } from '@core/shared/dto';
import { firstValueFrom, timeout } from 'rxjs';

import * as C from '@core/shared/constant';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
        private readonly paymentService: PaymentService
    ) { }

    async handleSignIn(body: SignInDto) {
        console.log('call to sign in event');
        const result = await firstValueFrom(this.authClient.send(C.MESSAGE_PATTERN.SIGN_IN, JSON.stringify(body)).pipe(timeout(10000)));
        return result;
    }

    createUser(createUserDto: CreateUserDto) {
        this.authClient.emit('user.create', JSON.stringify(createUserDto));
        return createUserDto;
    }

    async createUserMessage(createUserDto: CreateUserDto) {
        const result: any = await firstValueFrom(this.authClient.send(C.MESSAGE_PATTERN.USER_CREATE, JSON.stringify(createUserDto)).pipe(timeout(30000)));
        const payment = await this.paymentService.createPayment({
            userId: result.id,
            amount: 1000,
            name: createUserDto.name
        });
        console.log({ payment });
        return result;
    }

    async getListUsers() {
        console.log('call to list user message');
        const resultList = await firstValueFrom(this.authClient.send(C.MESSAGE_PATTERN.USER_LIST, {}).pipe(timeout(30000)));

        // paymentClient
        return resultList;
    }

    async onModuleInit() {
        this.authClient.subscribeToResponseOf(C.MESSAGE_PATTERN.USER_LIST);
        this.authClient.subscribeToResponseOf(C.MESSAGE_PATTERN.USER_CREATE);
        this.authClient.subscribeToResponseOf(C.MESSAGE_PATTERN.SIGN_IN);
        await this.authClient.connect();
    }
}
