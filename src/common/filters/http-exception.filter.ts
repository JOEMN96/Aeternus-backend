import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { WinstonLogger } from 'src/config/winston.logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if (status === 500) {
            const logger = new WinstonLogger('HttpExceptionFilter');
            logger.http(`HTTP Exception Message: ${exception.message} | Status: ${status} | URL: ${request.url}`);
        }

        response.status(status).json({
            error: exception.getResponse()['message'],
            timestamp: new Date().toISOString(),
            path: request.url,
            statusCode: status,
            message: exception.message,
        });
    }
}
