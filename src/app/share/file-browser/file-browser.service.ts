import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileRecord } from './file-record';

@Injectable({
  providedIn: 'root'
})
export class FileBrowserService {

  private static readonly BASE_API_URL = '/api/filebrowser';

  constructor(private _http: HttpClient) { }

  /**
   * Komparátor pro správné řazení souborů v prohlížeči souborů
   * Složky jsou na prvním místě
   *
   * @param a
   * @param b
   */
  private static comparator = (a, b) => {
    if ((a.isDirectory && b.isDirectory) || (!a.isDirectory && !b.isDirectory)) {
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
  };

  /**
   * Vrátí obsah pro zadanou cestu podsložek
   *
   * @param folders Pole složek, které se sloučí do výsledné cesty,
   *        pro kterou se vrátí obsah
   */
  getContent(folders: FileRecord[]): Promise<FileRecord[]> {
    const subfolders = folders.map(value => value.name).join('/');
    console.log('Zobrazuji obsah pro podslozky: ' + subfolders);
    return this._http.get<{files: FileRecord[]}>(`${FileBrowserService.BASE_API_URL}/${subfolders}`)
               .toPromise()
               .then(result => {
                 return result.files.sort(FileBrowserService.comparator);
               });
  }

  /**
   * Vytvoří novou složku v datané cestě podsložek
   *
   * @param folders Pole složek, ve které se na konci vytvoří nová složka
   * @param folderName Název nové složky
   */
  createFolder(folders: FileRecord[], folderName: string): Promise<FileRecord[]> {
    const subfolders = folders.map(value => value.name).join('/');
    if (subfolders) {
      folderName = subfolders + '/' + folderName;
    }
    return this._http.put<{files: FileRecord[]}>(`${FileBrowserService.BASE_API_URL}/${folderName}`, null)
               .toPromise()
               .then(result => {
                 return result.files.sort(FileBrowserService.comparator);
               });
  }

  /**
   * Nahraje zadané soubory do vybrané složky
   *
   * @param folders Pole složek, ve kterém se do poslední složky nahrají soubory
   * @param files Soubory, které se mají nahrát
   */
  upload(folders: FileRecord[], files: FileList): Promise<FileRecord[]> {
    const subfolders = folders.map(value => value.name).join('/');
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file: File = files.item(i);
      formData.append(file.name, file);
    }

    return this._http.post<{files: FileRecord[]}>(`${FileBrowserService.BASE_API_URL}/${subfolders}`, formData)
               .toPromise()
               .then(result => {
                 return result.files.sort(FileBrowserService.comparator);
               });
  }

  /**
   * Smaže soubor/složku z cesty
   *
   * @param folders Pole složek
   * @param file Soubor/složka, která se má smazat
   *        v případě složky se smaže rekurzivně i její obsah!
   */
  delete(folders: FileRecord[], file: FileRecord) {
    let folderName = file.name;
    if (!file.isDirectory) {
      folderName += `.${file.extention}`;
    }

    const subfolders = folders.map(value => value.name).join('/');
    if (subfolders) {
      folderName = subfolders + '/' + folderName;
    }
    return this._http.delete<{files: FileRecord[]}>(`${FileBrowserService.BASE_API_URL}/${folderName}`)
               .toPromise()
               .then(result => {
                 return result.files.sort(FileBrowserService.comparator);
               });
  }
}
