import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShareValidators } from '../share/ShareValidators';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', ShareValidators.getPasswordValidators()),
    remember: new FormControl(false)
  });

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.authForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(!(state !== 'INVALID'));
    });
  }

  handleLogin() {
    this._authService.login(this.authForm.value)
        .then(value => {
          this._router.navigate(['/account/my']);
        })
        .catch(reason => {
          console.error(reason);
        });
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }
}
