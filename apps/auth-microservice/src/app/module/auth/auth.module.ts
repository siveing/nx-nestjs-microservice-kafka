import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./service/auth.service";


@Module({
    imports: [UserModule],
    controllers: [],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}