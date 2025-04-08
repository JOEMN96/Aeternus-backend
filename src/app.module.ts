import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as SuperTokensConfig from './config';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
