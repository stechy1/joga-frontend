import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { UserRole } from '../auth/user';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private readonly _authService: AuthService, private readonly _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this._authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user && user.role === UserRole.ADMIN;
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
        const canLoad = !!user;

        if (!canLoad) {
          this._router.navigate(['/auth']);
          return false;
        }

        return true;
      })
    );
  }
}
