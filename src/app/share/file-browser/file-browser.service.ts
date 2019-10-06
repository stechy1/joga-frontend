import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileRecord } from './file-record';

@Injectable({
  providedIn: 'root'
})
export class FileBrowserService {

  private static readonly BASE_API_URL = '/api/filebrowser';

  constructor(private _http: HttpClient) { }

  getContent(folder: string): Promise<FileRecord[]> {
    return this._http.get<{files: FileRecord[]}>(`${FileBrowserService.BASE_API_URL}/${folder}`)
               .toPromise()
               .then(result => {
                 return result.files;
               });
  }

}
