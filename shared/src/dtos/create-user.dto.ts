// libs/shared/src/lib/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(4)
    password: string;

    @ApiProperty()
    @IsOptional()
    role: any;

    @ApiProperty()
    @IsNotEmpty()
    avatar: string;
}
