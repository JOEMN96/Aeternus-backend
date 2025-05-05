// import ThirdParty from 'supertokens-node/recipe/thirdparty';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import 'dotenv/config';

export const appInfo = {
    appName: 'Aeternus ',
    apiDomain: process.env.API_DOMAIN,
    websiteDomain: process.env.WEBSITE_DOMAIN,
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
};

export const connectionUri = process.env.SUPERTOKENS_CONNECTION_URI;
export const corApiKey = process.env.SUPERTOKENS_CORE_API;

export const recipeList = [
    EmailPassword.init({
        override: {
            apis: (originalImplementation) => {
                return {
                    ...originalImplementation,
                    signUpPOST: undefined, // Handled in Auth.controller.ts
                };
            },
        },
    }),
    Passwordless.init({
        contactMethod: 'EMAIL',
        flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
    }),
    Session.init({
        getTokenTransferMethod: () => {
            return 'cookie';
        },
    }),
    Dashboard.init(),
    UserRoles.init(),
];
