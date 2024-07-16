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
    async handleUserCreateMessage(@Payload(ValidationPipe) data: CreateUserDto) {
        const result = await this.userService.create(data);
        return { data: result, message: 'user created', success: true };
    }

    @MessagePattern(MESSAGE_PATTERN.USER_LIST) // message.user.list
    async getListUsers() {
        const result = await this.userService.getAll({});
        return { data: result, message: 'user list', success: true };
    }
}