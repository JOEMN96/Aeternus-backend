import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    dob: Date;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['M', 'F'])
    gender: string;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['gender'])) {}
