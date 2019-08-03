import { Injectable } from '@angular/core';
import { BASE_ADMIN_API } from '../admin.share';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'clients';

  private static readonly KEY_GET_ALL_FROM = 'from';
  private static readonly KEY_GET_ALL_COUNT = 'count';

  constructor(private _http: HttpClient) {
  }

  allClients(clientIndex: number, clientsPerPage: number): Promise<Client[]> {
    const formData = new FormData();
    formData.append(ClientsService.KEY_GET_ALL_FROM, String(clientIndex));
    formData.append(ClientsService.KEY_GET_ALL_COUNT, String(clientsPerPage));

    return this._http.post<{clients: []}>(ClientsService.ACCESS_POINT, formData)
    .toPromise()
    .then(result => {
      return result.clients as Client[];
    });
  }
}
