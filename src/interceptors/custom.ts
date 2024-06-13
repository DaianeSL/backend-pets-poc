import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import mongoose from 'mongoose';
import { HttpException } from '@nestjs/common';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (request.params.id) {
      const isValid = mongoose.Types.ObjectId.isValid(request.params.id);
      if (!isValid) throw new HttpException('Invalid id', 400);
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
