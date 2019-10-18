import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.css']
})
export class CheckCodeComponent implements OnInit {
  checkCodeForm = new FormGroup({
    checkCode: new FormControl('', [Validators.required])
  });

  constructor(private _auth: AuthService, private _toastr: ToastrService,
              private _route: ActivatedRoute, private _router: Router) {
  }

  private _checkCode(code: string): void {
    this._auth.checkCode(code)
        .then(() => {
          return this._router.navigate(['/auth']);
        });
  }

  ngOnInit() {
    const code = this._route.snapshot.params.code;
    if (code !== undefined) {
      this._checkCode(code);
    }
  }

  handleCheckCode() {
    this._checkCode(this.checkCodeForm.value.checkCode);
  }

  get checkCode() {
    return this.checkCodeForm.get('checkCode');
  }
}
