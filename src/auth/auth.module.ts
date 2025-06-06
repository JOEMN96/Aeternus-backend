import { MiddlewareConsumer, Module, NestModule, DynamicModule } from '@nestjs/common';

import { AuthMiddleware } from './auth.middleware';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    providers: [SupertokensService],
    exports: [],
    controllers: [],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
    }

    static forRoot({ connectionURI, apiKey, appInfo }: AuthModuleConfig): DynamicModule {
        return {
            providers: [
                {
                    useValue: {
                        appInfo,
                        connectionURI,
                        apiKey,
                    },
                    provide: ConfigInjectionToken,
                },
                SupertokensService,
                AuthService,
            ],
            exports: [],
            imports: [],
            module: AuthModule,
            controllers: [AuthController],
        };
    }
}
