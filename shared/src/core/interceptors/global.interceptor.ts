import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class GlobalInterceptors<T> implements NestInterceptor<T, Response<T>> {
  constructor() { }
  logger = new Logger('RequestResponse')
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    
    // SAVE THE REQUEST
    const request = context.switchToHttp().getRequest();
    if (request.body)
      this.logger.debug(`Request url:${request.url}, data:`, JSON.stringify(request.body || {})); 

    return next.handle().pipe(map(data => {
      return ({ success: true, message: 'Successfully', data: data?.data ? data?.data : data || {} });
    }));
  }

}
