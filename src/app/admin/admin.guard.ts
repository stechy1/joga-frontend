import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { User, UserRole } from '../auth/user';
import { NGXLogger } from 'ngx-logger';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private readonly _authService: AuthService, private readonly _router: Router,
              private logger: NGXLogger) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this._authService.user.pipe(
      take(1),
      map((user: User) => {
        const isAuth = user.role >= UserRole.LECTOR;
        this.logger.debug("Admin guard - canActivate: " + isAuth);
        if (isAuth) {
          return true;
        }
        return this._router.createUrlTree(['/auth']);
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.user.pipe(
      take(1),
      map(user => {
        const canLoad = user.role >= UserRole.LECTOR;
        this.logger.debug("Admin guard - canLoad: " + canLoad);
        if (!canLoad) {
          this._router.navigate(['/auth']);
          return false;
        }

        return true;
      })
    );
  }
}
