import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  model: {username: string, password: string};
  loading: boolean;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.model = {username: '', password: ''};
  }

  login() {
      this._authService.login('email', '123456')
          .then(value => {
            this._router.navigate(['/account/my']);
          })
          .catch(reason => {
            console.error(reason);
          });
  }
}
