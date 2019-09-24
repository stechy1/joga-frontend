import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { UserRole } from './user';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private readonly _authService: AuthService, private readonly _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this._authService.user.pipe(
      take(1),
      map(user => {
        const notAuth = user.role === UserRole.NONE;
        console.log("Auth guard - canActivate: " + notAuth);
        if (notAuth) {
          return true;
        }
        return this._router.createUrlTree(['/', 'account', 'my']);
      })
    );
  }
}
