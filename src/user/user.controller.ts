import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'supertokens-nestjs';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
@UseGuards(new AuthGuard())
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/')
    createNewUser(@Body() createUserDto: CreateUserDto, @Session() session: SessionContainer) {
        const userId = session.getUserId();
        const newUser = this.userService.createNewUser(createUserDto, userId);
        return newUser;
    }

    @Get('/')
    getUser(@Session() session: SessionContainer) {
        const userId = session.getUserId();
        const user = this.userService.getUserByUserId(userId);
        return user;
    }

    @Put('/')
    updateUser(@Session() session: SessionContainer, schema: UpdateUserDto) {
        const userId = session.getUserId();
        const user = this.userService.updateUser(schema, userId);
        return user;
    }
}
