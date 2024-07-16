import { Controller, ValidationPipe } from '@nestjs/common';

import { SignInDto } from '@core/shared/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

import * as C from '@core/shared/constant';
import { AuthService } from '../service/auth.service';

@Controller()
export class MessageAuthController {
    constructor(private readonly authService: AuthService) { }

    @MessagePattern(C.MESSAGE_PATTERN.SIGN_IN) // auth.signIn
    async handleSignIn(@Payload(ValidationPipe) body: SignInDto) {
        console.log('Received request message sign in');
        return await this.authService.handleSignIn(body);
    }
}