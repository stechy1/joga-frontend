import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject} from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

import { User } from './user';

interface LoginResponce {
  result: string;
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly AUTH_URL_REGISTER = 'api/auth/register';
  private static readonly AUTH_URL_LOGIN = 'api/auth/login';

  private static readonly STORAGE_JWT = 'jwt';

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private _http: HttpClient, private _storage: LocalStorageService, private _router: Router) {}

  private _auth(email: string, password: string, url: string): Promise<object> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this._http.post(url, formData).toPromise();
  }

  public register(email: string, password: string): Promise<object> {
    return this._auth(email, password, AuthService.AUTH_URL_REGISTER);
  }

  public login(email: string, password: string): Promise<object> {
    return this._auth(email, password, AuthService.AUTH_URL_LOGIN)
               .then((data: LoginResponce) => {
                 const jwtData = data.jwt;
                 this._storage.set(AuthService.STORAGE_JWT, jwtData);
                 this.user.next(new User(jwtData));
                 return null;
               });
  }

  autoLogin() {
    const jwtData = this._storage.get<string>(AuthService.STORAGE_JWT);
    if (jwtData) {
      const user = new User(jwtData);
      if (!user.token) {
        this.logout();
      }
      this.user.next(user);
    }
  }

  public logout() {
    this._storage.remove(AuthService.STORAGE_JWT);
    this.user.next(null);
    this._router.navigate(['/auth']);
  }
}
