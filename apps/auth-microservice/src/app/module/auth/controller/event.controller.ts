import { Controller, ValidationPipe } from '@nestjs/common';

import { CreateUserDto, SignInDto } from '@core/shared/dto';
import { EventPattern, Payload } from '@nestjs/microservices';

import * as C from '@core/shared/constant';
import { AuthService } from '../service/auth.service';

@Controller()
export class EventAuthController {
    constructor(private readonly authService: AuthService) { }

    @EventPattern(C.EVENT_PATTERN.SIGN_UP) // auth.signUp
    handleSignUp(@Payload(ValidationPipe) data: CreateUserDto) {
        // SIGN UP EVENT CODE ....
        console.log('Call to sign up event');
        
    }
}