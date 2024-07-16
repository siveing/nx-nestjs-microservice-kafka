// apps/api-gateway/src/auth/auth.service.ts

import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@core/shared/dto';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
    ) { }

    createUser(createUserDto: CreateUserDto) {
        console.log('call to create user event');
        this.authClient.emit('user.create', JSON.stringify(createUserDto));
    }

    createUserMessage(createUserDto: CreateUserDto) {
        console.log('call to create user message');
        const res = this.authClient.send('message.user.create', JSON.stringify(createUserDto))
        if (res) return res;
        throw new BadRequestException('User not created')
    }

    async onModuleInit() {
        this.authClient.subscribeToResponseOf('message.user.create');
        await this.authClient.connect();
    }
}
