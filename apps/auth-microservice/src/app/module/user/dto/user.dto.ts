import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MinLength
} from 'class-validator';

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
  @IsUrl()
  @IsNotEmpty()
  avatar: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MinLength(4)
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  role: any;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  avatar: string;
}

export class ValidateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class FilterUsersDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  limit?: number;
}
