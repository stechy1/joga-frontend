import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileRecord } from './file-record';

@Injectable({
  providedIn: 'root'
})
export class FileBrowserService {

  private static readonly BASE_API_URL = '/api/filebrowser';

  constructor(private _http: HttpClient) { }

  private static comparator = (a, b) => {
    if (!a.isDirectory && !b.isDirectory) {
      // @ts-ignore
      return a.name.toLowerCase() - b.name.toLowerCase();
    }

    if (a.isDirectory) {
      return -1;
    }

    if (b.isDirectory) {
      return 1;
    }

    return 0;
  }

  getContent(folders: FileRecord[]): Promise<FileRecord[]> {
    const subfolders = folders.map(value => value.name).join('/');
    console.log('Zobrazuji obsah pro podslozky: ' + subfolders);
    return this._http.get<{files: FileRecord[]}>(`${FileBrowserService.BASE_API_URL}/${subfolders}`)
               .toPromise()
               .then(result => {
                 return result.files.sort(FileBrowserService.comparator);
               });
  }

  createFolder(folders: FileRecord[], folderName: string): Promise<any> {
    const subfolders = folders.map(value => value.name).join('/');
    if (subfolders) {
      folderName = subfolders + '/' + folderName;
    }
    return this._http.put<any>(`${FileBrowserService.BASE_API_URL}/${folderName}`, null)
               .toPromise()
               .then(result => {
                 return result.files.sort(FileBrowserService.comparator);
               });
  }
}
