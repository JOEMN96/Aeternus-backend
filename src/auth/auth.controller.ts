import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { loginDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from './session/session.decorator';
import { AuthService } from './auth.service';
import { PublicAccess } from 'supertokens-nestjs';
import { ApiBody } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //  Others endpoints are handled by supertoken

    @Post('/signup')
    @PublicAccess()
    @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } } })
    async login(@Body() body: loginDto) {
        let { email, password } = body;
        return await this.authService.signUpWithEmailPassword(email, password);
    }

    @Get('/session')
    @UseGuards(new AuthGuard())
    userSession(@Session() session: SessionContainer) {
        const userId = session.getUserId();
        return {
            userId,
        };
    }
}
