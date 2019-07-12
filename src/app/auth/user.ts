import * as jwt_decode from 'jwt-decode';
import { JWT } from './jwt';

export class User {

  public readonly id: string;
  private readonly _token: string;
  private readonly _exprirationDate: Date;

  constructor(jwt: string) {
    this._token = jwt;
    const payload = jwt_decode(jwt) as JWT;
    this.id = payload.id;
    this._exprirationDate = new Date(payload.exp);
  }

  get token(): string {
    if (!this._exprirationDate || new Date() > this._exprirationDate) {
      return '';
    }

    return this._token;
  }

}
