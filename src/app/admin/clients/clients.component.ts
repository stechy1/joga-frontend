import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Client } from './client';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private static readonly CLIENTS_PER_PAGE = 10;
  private static readonly DEFAULT_CLIENT_INDEX = 1;

  private _clientIndex = -1;
  private _clients: Client[] = [];
  private _totalPages$ = new BehaviorSubject<number>(0);
  private _totalClients = Number.MAX_SAFE_INTEGER;

  constructor(private _clientsService: ClientsService) { }

  ngOnInit() {}

  handleChangePage(showIndex: number) {
    this._clientsService.allClients(this._totalClients - ((showIndex - 1) * ClientsComponent.CLIENTS_PER_PAGE), ClientsComponent.CLIENTS_PER_PAGE)
        .then(clients => {
          if (this._clientIndex === ClientsComponent.DEFAULT_CLIENT_INDEX) {
            if (clients.length > 0) {
              this._totalClients = +clients[0].id;
              this._totalPages$.next(Math.round(this._totalClients / ClientsComponent.CLIENTS_PER_PAGE));
            }
          }
          this._clients = clients;
        });
    this._clientIndex = showIndex;
  }

  get clients(): Client[] {
    return this._clients;
  }

  get totalPages(): Observable<number> {
    return this._totalPages$;
  }
}
