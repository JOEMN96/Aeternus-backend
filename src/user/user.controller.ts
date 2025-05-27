import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'supertokens-nestjs';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { ApiCookieAuth } from '@nestjs/swagger';

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
    @ApiCookieAuth('')
    getUser(@Session() session: SessionContainer) {
        const userId = session.getUserId();
        const user = this.userService.getUserByUserId(userId);
        return user;
    }

    @Patch('/')
    updateUser(@Body() schema: UpdateUserDto, @Session() session: SessionContainer) {
        const userId = session.getUserId();
        const user = this.userService.updateUser(schema, userId);
        return user;
    }
}
