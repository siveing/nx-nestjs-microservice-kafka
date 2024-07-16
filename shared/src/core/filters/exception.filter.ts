import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();

        const statusCode = exception.getStatus();
        const response = exception.getResponse() as { statusCode: number; message: string | string[]; error: string; };
        const message = Array.isArray(response.message) ? response.message[0] : response.message;

        if (host.getType() === 'rpc' || exception instanceof RpcException) return throwError(() => ({ statusCode, message }));

        if (statusCode >= 500) console.error(exception);
        else console.log(response);

        res.status(statusCode).json({ statusCode, message });
    }
}
