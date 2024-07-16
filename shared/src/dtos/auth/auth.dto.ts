import { IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { CreateUserDto } from "../create-user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class SignUpDto extends CreateUserDto {
  
}