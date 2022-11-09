import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto { 
    @IsEmail()
    @IsNotEmpty()
    readonly email: string; 
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
   readonly name: string;
    @IsString()
    @IsOptional()
    readonly lastname: string;
}
