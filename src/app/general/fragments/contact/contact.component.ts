import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../general.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    message: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    recaptcha: new FormControl(['', Validators.required])
  });

  working = false;
  captchaSuccess = false;

  constructor(private _service: GeneralService, private _toastr: ToastrService) {
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.working = true;
    this._service.sendEmail(this.contactForm.value)
        .then(() => {
          this._toastr.success("Váš e-mail byl úspěšně odeslán.");
        }).finally(() => {
          this.working = false;
          this.contactForm.reset();
          this.contactForm.markAsUntouched();
        });
  }

  get siteKey(): string {
    return environment.recaptcha.siteKey;
  }

  handleReset() {

  }

  handleLoad() {

  }

  handleExpire() {

  }

  handleSuccess(captchaResponse: string) {
    this.captchaSuccess = true;
  }
}
