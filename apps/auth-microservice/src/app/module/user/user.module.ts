import { Module } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { EventUserController } from "./controller/event.controller";
import { MessageUserController } from "./controller/message.contoller";

export const ENTITIES = [User];

@Module({
    imports: [
        TypeOrmModule.forFeature(ENTITIES),
    ],
    controllers: [
        EventUserController,
        MessageUserController
    ],
    providers: [UserService],
    exports: [TypeOrmModule, UserService]
})
export class UserModule { }