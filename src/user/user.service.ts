import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async getUserByUserId(userId: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { userId },
        });
    }

    async createNewUser(createUserDto: CreateUserDto, userId: string): Promise<User> {
        const { first_name, last_name, dob, city, gender } = createUserDto;
        try {
            const existingUser = await this.getUserByUserId(userId);
            if (existingUser) {
                throw new HttpException('User Account already exists', HttpStatus.CONFLICT);
            }
            const newUser = this.usersRepository.create({
                userId,
                first_name,
                last_name,
                dob,
                city,
                gender,
            });
            return await this.usersRepository.save(newUser);
        } catch (error) {
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(updateUserDto: UpdateUserDto, userId: string): Promise<User | null> {
        const { ...updateData } = updateUserDto;
        try {
            await this.usersRepository.update({ userId }, updateData);
            return this.getUserByUserId(userId);
        } catch (error) {
            return null;
        }
    }
}
