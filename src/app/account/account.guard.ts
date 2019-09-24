import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserRole } from '../auth/user';
import { NGXLogger } from 'ngx-logger';

@Injectable({providedIn: 'root'})
export class AccountGuard implements CanActivate, CanLoad {

  constructor(private _authService: AuthService, private _router: Router,
              private logger: NGXLogger) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this._authService.user.pipe(
      take(1),
      map(user => {
        const userRole = user.role;
        this.logger.debug("Account guard - canActivate: " + UserRole[userRole]);
        switch (userRole) {
          case UserRole.LECTOR:
          case UserRole.ADMIN:
            return this._router.createUrlTree(['/admin']);
          case UserRole.CLIENT:
            return true;
          default:
            return this._router.createUrlTree(['/auth']);
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.user.pipe(
      take(1),
      map(user => {
        const canLoad = user.role >= UserRole.CLIENT;
        this.logger.debug("Account guard - canLoad: " + canLoad);

        if (!canLoad) {
          this._router.navigate(['/auth']);
          return false;
        }

        return true;
      })
    );
  }


}
