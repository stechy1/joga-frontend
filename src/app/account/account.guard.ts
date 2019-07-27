import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserRole } from '../auth/user';

@Injectable({providedIn: 'root'})
export class AccountGuard implements CanActivate, CanLoad {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this._authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = user.role === UserRole.CLIENT;
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
        const canLoad = user.role === UserRole.CLIENT || user.role === UserRole.ADMIN;

        if (!canLoad) {
          this._router.navigate(['/auth']);
          return false;
        }

        return true;
      })
    );
  }


}
