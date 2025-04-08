# Auth with SuperTokens

We are using [supertokens](https://supertokens.com/docs) for Auth.

## Steps to Do for Auth

    - Once created the supertoken backend service either self host or managed.
    - Vist this URL to open dashboard - http://localhost:3001/auth/dashboard/
    - Run this following command to create a new user in auth dashboard
    ```
     curl --location --request POST 'BASE-URL-HERE/recipe/dashboard/user' \
        --header 'rid: dashboard' \
        --header 'api-key: API_KEY_HERE' \
        --header 'Content-Type: application/json' \
        --data-raw '{"email": "EMAILHERE","password": "PASSWORDHERE"}'`
    ```

## Auth Structure

#### SuperTokens

The full configuration needed for the SuperTokens' back-end to work is in the `src/config.ts` file. This file will differ based on the [auth recipe](https://supertokens.com/docs/guides) you choose.

You can further customize SuperTokens in the `src/config.ts` file. Refer to our [docs](https://supertokens.com/docs) (and make sure to choose the correct recipe) for more details.

## Application Flow

When using SuperTokens, the front-end never calls directly to the SuperTokens Core, the service that creates and manages sessions. Instead, the front-end calls to the back-end and the back-end calls to the Core. You can read more about [how SuperTokens works here](https://supertokens.com/docs/thirdpartyemailpassword/architecture).

The back-end has two main files:

1. **Entry Point (`main.ts`)**

   - Initializes SuperTokens
   - Adds CORS headers for sessions with the front-end
   - Adds SuperTokens middleware

2. **Configuration (`config.ts`)**
   - `supertokensConfig`:
     - `supertokens`:
       - `connectionURI`: Sets the URL that your SuperTokens core is located. By default, it connects to the playground core. In production, you can [host your own core](https://supertokens.com/docs/thirdpartyemailpassword/pre-built-ui/setup/core/with-docker) or create an account to [enable managed hosting](https://supertokens.com/dashboard-saas)
     - `appInfo`: Holds informaiton like your project name
       - `apiDomain`: Sets the domain your back-end API is on. SuperTokens automatically listens to requests at `${apiDomain}/auth`
       - `websiteDomain`: Sets the domain your front-end website is on
     - `recipeList`: An array of recipes for adding supertokens features

## Additional Auth resources

- Custom UI Example: https://github.com/supertokens/supertokens-web-js/tree/master/examples/react/with-thirdpartyemailpassword
- Custom UI Blog post: https://supertokens.medium.com/adding-social-login-to-your-website-with-supertokens-custom-ui-only-5fa4d7ab6402
- Awesome SuperTokens: https://github.com/kohasummons/awesome-supertokens
