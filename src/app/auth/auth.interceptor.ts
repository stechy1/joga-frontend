import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { User, UserRole } from './user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        switch (user.role) {
          case UserRole.NONE:
            return next.handle(req);
            case UserRole.CLIENT:
            case UserRole.ADMIN: {
              const modifiedReq = req.clone({
                setHeaders: {
                  Authorization: user.token
                }
              });
              return next.handle(modifiedReq);
            }
        }
      })
    );
  }
}
