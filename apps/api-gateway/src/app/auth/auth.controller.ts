// apps/api-gateway/src/auth/auth.controller.ts

import { Body, Controller, Get, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from '@core/shared/dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    private logger = new Logger(AuthController.name);

    @Post('sign-in')
    login(@Body(ValidationPipe) body: SignInDto) {
        return this.authService.handleSignIn(body);
    }

    @Post('sign-up')
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.authService.createUser(createUserDto);
    }

    @Post('msg/sign-up')
    createUserMessage(@Body(ValidationPipe) createUserDto: CreateUserDto) {
       return this.authService.createUserMessage(createUserDto);
    }

    @Get('users')
    getListUsers() {
        return this.authService.getListUsers();
    }
}