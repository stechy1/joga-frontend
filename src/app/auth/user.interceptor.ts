import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';
import { User, UserRole } from './user';
import { EMPTY } from 'rxjs';
import { format } from '../share/string-utils';
import { Router } from '@angular/router';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  private static readonly RESTRICTED_URL_PATTERN = '/api/{0}/';

  private static readonly RESTRICTED_URLS = [
    'admin',
    'account'
  ];

  constructor(private _authService: AuthService, private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const url = req.url;
    let needAuth = false;
    for (const restrictedURL of UserInterceptor.RESTRICTED_URLS) {
      if (url.startsWith(format(UserInterceptor.RESTRICTED_URL_PATTERN, [restrictedURL]))) {
        needAuth = true;
        break;
      }
    }

    if (!needAuth) {
      return next.handle(req);
    }

    return this._authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        switch (user.role) {
          case UserRole.NONE:
            this._router.navigate(['/auth']);
            return EMPTY;
          case UserRole.CLIENT:
          case UserRole.ADMIN: {
            return next.handle(req);
          }
        }
      })
    );
  }
}
