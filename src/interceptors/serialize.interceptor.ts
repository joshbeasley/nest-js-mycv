import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";


export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the reuqest handler
    console.log('running before the handler')
    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the respose is sent out
        console.log('running before the response is sent out')
      })
    )
  }
}