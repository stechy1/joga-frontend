import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ShareValidators } from '../../share/ShareValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', ShareValidators.getPasswordValidators()),
    password2: new FormControl('', ShareValidators.getPasswordValidators())
  }, RegisterComponent._passwordMatchesCheck);

  constructor(private _authService: AuthService, private _router: Router) { }

  private static _passwordMatchesCheck(group: FormGroup) {
    const pass = group.get('password').value;
    const checkPass = group.get('password2').value;

    return pass !== checkPass ? {'notSame': true} : null;
  }

  ngOnInit() {
    this.registerForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(!(state !== 'INVALID'));
    });
  }

  handleRegister() {
    this._authService.register(this.registerForm.value)
        .then(value => {
          this._router.navigate(['/auth']);
        })
        .catch(reason => {
          console.error(reason);
        });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }
}
