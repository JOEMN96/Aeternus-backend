import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import * as SuperTokensConfig from './auth.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WinstonLogger } from './config/winston.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new WinstonLogger(),
    });
    app.enableCors({
        origin: [SuperTokensConfig.appInfo.websiteDomain],
        allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new SupertokensExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3001);
}
bootstrap();
