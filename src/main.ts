import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import * as SuperTokensConfig from './auth.config';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WinstonLogger } from './config/winston.logger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new WinstonLogger(),
    });
    app.enableCors({
        origin: [SuperTokensConfig.appInfo.websiteDomain],
        allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
        credentials: true,
    });
    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints[Object.keys(error.constraints)[0]],
                }));
                return new UnprocessableEntityException(result);
            },
        }),
    );

    app.useGlobalFilters(new SupertokensExceptionFilter());

    const config = new DocumentBuilder().setTitle('API Docs').setDescription('Project API description').setVersion('1.0').addTag('BE').build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(3001);
}
bootstrap();
