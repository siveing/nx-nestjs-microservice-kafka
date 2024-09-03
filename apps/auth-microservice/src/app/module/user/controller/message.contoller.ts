// apps/auth-microservice/src/app/app.controller.ts

import { Controller, ValidationPipe } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@core/shared/dto';
import { MESSAGE_PATTERN } from '../constant/message';
import { UserService } from '../service/user.service';

import * as C from '@core/shared/constant'

@Controller()
export class MessageUserController {
    constructor(private readonly userService: UserService) { }

    @MessagePattern(C.MESSAGE_PATTERN.USER_CREATE) // user.create.message
    async handleUserCreateMessage(@Payload(ValidationPipe) data: CreateUserDto) {

        console.log({ data });

        const result = await this.userService.create(data);
        return result;
    }

    @MessagePattern(C.MESSAGE_PATTERN.USER_LIST) // message.user.list
    async getListUsers() {
        console.log("CALLING LIST USER MESSAGE");

        const result = await this.userService.getAll({});
        return result;
    }
}