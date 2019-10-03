import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, NEVER, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { HttpStatusCode } from './HttpStatusCode';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface ResponseMessage {
  message: string;
  type: 0|1|2|3;
}

export class ResponseInterceptor implements HttpInterceptor {

  constructor(private _toaster: ToastrService,
              private readonly _auth: AuthService,
              private logger: NGXLogger) {}

  private _handleResponseMessage(message: ResponseMessage) {
    switch (message.type) {
      case 0: {
        this._toaster.success(message.message);
        break;
      }
      case 1: {
        this._toaster.info(message.message);
        break;
      }
      case 2: {
        this._toaster.warning(message.message);
        break;
      }
      case 3: {
        this._toaster.error(message.message);
      }
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
               .pipe(
                 tap(response => {
                   if (response instanceof HttpResponse) {
                     if (response.body !== null) {
                       if (response.body.response_message) {
                         this._handleResponseMessage(response.body.response_message);
                       }
                     }
                   }
                 }),
                 catchError((response: any) => {
                   this.logger.error(response);
                   if (response instanceof HttpErrorResponse) {
                     const errorResponse = response as HttpErrorResponse;
                     if (errorResponse.error.response_message) {
                       this._handleResponseMessage(errorResponse.error.response_message);
                     }
                     if (errorResponse.status === HttpStatusCode.Unauthorized) {
                       this._auth.logout();
                       return NEVER;
                     }
                   }

                   return NEVER;
                 })
               );
  }

}
