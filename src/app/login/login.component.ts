import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: {username: string, password: string};
  loading: boolean;

  constructor() { }

  ngOnInit() {
  }

  login() {
    return false;
  }
}
