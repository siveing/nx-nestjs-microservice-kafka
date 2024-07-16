// apps/auth-microservice/src/app/app.controller.ts

import { Controller, ValidationPipe } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@core/shared/dto';
import { MESSAGE_PATTERN } from '../constant/message';
import { UserService } from '../service/user.service';

@Controller()
export class MessageUserController {
    constructor(private readonly userService: UserService) { }

    @MessagePattern(MESSAGE_PATTERN.USER_CREATE) // user.create.message
    handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto) {
        console.log("Received request message create user");

        const result = this.userService.create(data);
        return { data: JSON.stringify(result), message: 'user created', success: true };
    }
}