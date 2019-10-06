import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  private static readonly BASE_API_URL = '/api/markdown';

  constructor(private _http: HttpClient) { }

  public encode(text: string): Promise<string> {
    const formData = new FormData();
    formData.append('content', text);

    return this._http.post<{html: string}>(MarkdownService.BASE_API_URL, formData)
               .toPromise()
               .then(result => {
                 return result.html;
               });
  }
}
