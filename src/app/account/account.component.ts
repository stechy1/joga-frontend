import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  handleLogout() {
    this._auth.logout();
  }
}
