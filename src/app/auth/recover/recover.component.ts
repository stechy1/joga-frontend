import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);

  recoverForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() { }

  ngOnInit() {
    this.recoverForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(!(state !== 'INVALID'));
    });
  }

  get email() {
    return this.recoverForm.get('email');
  }

}
