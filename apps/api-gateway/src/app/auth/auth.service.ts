// apps/api-gateway/src/auth/auth.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@nx-nestjs-microservices/shared/dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
        private readonly jwtService: JwtService,
    ) { }

    async createUser(createUserDto: CreateUserDto) {

        // CREATE JWT FROM CORE PROJECT 
        const encryptedText = await this.jwtService.signAsync(createUserDto);
        createUserDto.encryptedText = encryptedText;
        
        this.authClient.emit('create_user', JSON.stringify(createUserDto));
    }
}