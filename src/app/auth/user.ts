import * as jwt_decode from 'jwt-decode';
import { JWT } from './jwt';

export class User {

  public readonly id: string;
  public readonly _role: UserRole;
  private readonly _token: string;
  private readonly _exprirationDate: Date;

  constructor(jwt?: string) {
    if (jwt) {
      this._token = jwt;
      const payload = jwt_decode(jwt) as JWT;
      this.id = `${payload.id}`;
      this._role = payload.role;
      this._exprirationDate = new Date(+payload.exp * 1000);
    } else {
      this.id = '-1';
      this._token = null;
      this._role = UserRole.NONE;
      this._exprirationDate = null;
    }
  }

  private _expiredToken(): boolean {
    return (!this._exprirationDate || new Date() > this._exprirationDate);
  }

  get token(): string {
    return this._expiredToken() ? '' : this._token;
  }

  get role(): UserRole {
    return this._expiredToken() ? UserRole.NONE : this._role;
  }

}

export enum UserRole {
  NONE, CLIENT, LECTOR, ADMIN
}
