import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    dob: Date;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    gender: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
