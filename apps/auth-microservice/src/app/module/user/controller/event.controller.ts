// apps/auth-microservice/src/app/app.controller.ts

import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';

import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../service/user.service';
import { EVENT_PATTERN } from '../constant';
import { CreateUserDto } from '@core/shared/dto';

@Controller()
export class EventUserController {
    constructor(private readonly userService: UserService) { }

    @EventPattern(EVENT_PATTERN.USER_CREATE) // user.create
    handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto) {
        this.userService.create(data);
    }
}