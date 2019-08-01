import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Client } from './client';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private static readonly CLIENTS_PER_PAGE = 2;

  private _clientIndex = 1;
  private _clients: Client[] = [];

  private _totalPages$ = new BehaviorSubject<number>(0);

  constructor(private _clientsService: ClientsService) { }

  ngOnInit() {
    this._clientsService.allClients(this._clientIndex, ClientsComponent.CLIENTS_PER_PAGE)
    .then(clients => {
      this._clients = clients;
      this._totalPages$.next(Math.round(this._clients.length / ClientsComponent.CLIENTS_PER_PAGE));
    })
  }

  handleChangePage($event: number) {

  }

  get clients(): Client[] {
    return this._clients;
  }

  get totalPages(): Observable<number> {
    console.log('Total pages called' + this._clients.length);
    return this._totalPages$;
    // return Math.round(this._clients.length / ClientsComponent.CLIENTS_PER_PAGE);
  }
}
