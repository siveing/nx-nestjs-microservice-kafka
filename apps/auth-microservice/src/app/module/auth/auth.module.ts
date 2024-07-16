import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./service/auth.service";
import { EventAuthController } from "./controller/event.controller";
import { MessageAuthController } from "./controller/message.contoller";


@Module({
    imports: [UserModule],
    controllers: [
        EventAuthController,
        MessageAuthController
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}