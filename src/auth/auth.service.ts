import { Injectable } from '@nestjs/common';
import { RecipeUserId, User } from 'supertokens-node';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import UserRoles from 'supertokens-node/recipe/userroles';

@Injectable()
export class AuthService {
    async signUpWithEmailPassword(email: string, password: string, userContext?: any) {
        const userResp = await EmailPassword.signUp('public', email, password, userContext);
        if (userResp.status === 'OK') {
            await UserRoles.addRoleToUser('', userResp.user.id, 'USER');
        }
        return userResp;
    }
}
