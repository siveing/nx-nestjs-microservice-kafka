import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class PlaygroundDto {
    @ApiProperty()
    @IsOptional()
    name: string;
}