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

interface AuthModel {
  email: string;
  name?: string;
  password: string;
  password2?: string;
  remember?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly AUTH_URL_REGISTER = 'api/auth/register';
  private static readonly AUTH_URL_LOGIN = 'api/auth/login';

  private static readonly STORAGE_JWT = 'jwt';

  public static readonly MIN_PASSWORD_LENGTH = 7;

  user: BehaviorSubject<User> = new BehaviorSubject(new User());

  constructor(private _http: HttpClient, private _storage: LocalStorageService, private _router: Router) {}

  private _auth(authModel: AuthModel, url: string): Promise<object> {
    const formData = new FormData();
    formData.append('email', authModel.email);
    formData.append('name', authModel.name);
    formData.append('password', authModel.password);
    formData.append('password2', authModel.password2);
    formData.append('remember', `${authModel.remember}`);

    return this._http.post(url, formData).toPromise();
  }

  public register(authModel: AuthModel): Promise<object> {
    return this._auth(authModel, AuthService.AUTH_URL_REGISTER);
  }

  public login(authModel: AuthModel): Promise<object> {
    return this._auth(authModel, AuthService.AUTH_URL_LOGIN)
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
