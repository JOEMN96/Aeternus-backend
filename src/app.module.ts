import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as SuperTokensConfig from './auth.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import Entities from './entities';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        AuthModule.forRoot({
            connectionURI: SuperTokensConfig.connectionUri,
            apiKey: SuperTokensConfig.corApiKey,
            appInfo: SuperTokensConfig.appInfo,
        }),

        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: Entities,
            synchronize: true,
        }),

        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
