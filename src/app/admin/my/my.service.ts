import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_ADMIN_API } from '../admin.share';

@Injectable({
  providedIn: 'root'
})
export class MyService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'my';

  private static readonly ACTION_SAVE = `${MyService.ACCESS_POINT}/save`;
  private static readonly ACTION_PUBLISH = `${MyService.ACCESS_POINT}/publish`;

  private static readonly KEY_CONTENT = 'content';

  constructor(private _http: HttpClient) { }

  public download(): Promise<{my: string, studio: string}> {
    return this._http.get<{my: string, studio: string}>(MyService.ACCESS_POINT).toPromise();
  }

  public save(what: string, content: string) {
    const formData = new FormData();
    formData.append(MyService.KEY_CONTENT, content);

    return this._http.post<any>(`${MyService.ACTION_SAVE}/${what}`, formData).toPromise();
  }

  public publish(what: string) {
    return this._http.patch<any>(`${MyService.ACTION_PUBLISH}/${what}`, null).toPromise();
  }
}
