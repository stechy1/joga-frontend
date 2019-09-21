import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.css']
})
export class CheckCodeComponent implements OnInit {
  checkCodeForm = new FormGroup({
    checkCode: new FormControl('', [Validators.required])
  });

  constructor(private _auth: AuthService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const code = this._route.snapshot.params.code;
    if (code !== undefined) {
      this._auth.checkCode(code)
          .then(() => {
            this._router.navigate(['/auth']);
          });
    }
  }

  handleCheckCode() {

  }

  get checkCode() {
    return this.checkCodeForm.get('checkCode');
  }
}
