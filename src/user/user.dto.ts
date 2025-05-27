import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { PartialType, OmitType } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateUserDto' })
export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    dob: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({
        description: 'gender of the user',
        enum: ['M', 'F'],
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['M', 'F'])
    gender: string;
}

@ApiSchema({ name: 'UpdateUserDto' })
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['gender'])) {}
