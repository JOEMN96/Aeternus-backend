import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class loginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    password: string;
}
