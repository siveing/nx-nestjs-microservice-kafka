// apps/api-gateway/src/auth/auth.controller.ts

import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@nx-nestjs-microservices/shared/dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    private logger = new Logger(AuthController.name);

    @Post('sign-up')
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        this.logger.debug('\n====================== \nwork calling to auth controller\n======================');
        return this.authService.createUser(createUserDto);
    }
}