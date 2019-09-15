import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShareValidators } from '../../share/ShareValidators';
import { PersonalService } from './personal.service';
import { formToPasswordData, formToPersonalData } from './formConvertors';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ModalComponent } from '../../share/modal/modal.component';
import { ConfirmDialogComponent } from '../../share/modal/confirm/confirm-dialog.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  personalForm = new FormGroup({
    personalName: new FormControl('', [Validators.required]),
    personalPassword: new FormControl('', [Validators.required])
  });

  checkedForm = new FormGroup({
    notChecked: new FormControl(true, [Validators.requiredTrue]),
    checkCode: new FormControl('', [Validators.required])
  });

  passwordForm = new FormGroup({
    passwordOldPassword: new FormControl('', ShareValidators.getPasswordValidators()),
    passwordNewPassword: new FormControl('', ShareValidators.getPasswordValidators()),
    passwordNewPassword2: new FormControl('', ShareValidators.getPasswordValidators()),
  }, ShareValidators.createValidatorSameValues('passwordNewPassword', 'passwordNewPassword2'));

  dangerForm = new FormGroup({
    dangerPassword: new FormControl('', ShareValidators.getPasswordValidators())
  });

  constructor(private _personalService: PersonalService, private _auth: AuthService) { }

  ngOnInit() {
    this._personalService.dataForLoggedUser()
        .then(personalData => {
          this.personalForm.patchValue({
            personalName: personalData.name
          });
          this.checkedForm.patchValue({
            notChecked: personalData.checked == 0
          });
          console.log(personalData.checked == 0);
        });
  }

  handleUpdatePersonalInformations() {
    this._personalService.updatePersonalInformations(formToPersonalData(this.personalForm.value))
        .then(() => {
          this.personalForm.patchValue({
            personalPassword: ''
          });
          this.personalForm.markAsUntouched();
        });
  }

  handleCheckCode() {
    this._auth.checkCode(this.checkedForm.value['checkCode'])
        .then(() => {
          this.checkedForm.patchValue({
            notChecked: false,
            checkCode: ''
          });
          this.checkedForm.markAsUntouched();
        });
  }

  handleUpdatePassword() {
    this._personalService.updatePassword(formToPasswordData(this.passwordForm.value))
        .then(() => {
          this.passwordForm.reset();
          this.passwordForm.markAsUntouched();
        });
  }

  handleDisableAccount() {
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete zrušit účet?',
      confirm: () => this._personalService
                         .disableAccount(this.dangerForm.value['dangerPassword'])
                         .then(() => this._auth.logout())
    });
  }

  get personalName() {
    return this.personalForm.get('personalName');
  }

  get personalPassword() {
    return this.personalForm.get('personalPassword');
  }


  get passwordOldPassword() {
    return this.passwordForm.get('passwordOldPassword');
  }


  get checkCode() {
    return this.checkedForm.get('checkCode');
  }

  get notChecked() {
    return this.checkedForm.get('notChecked');
  }

  get passwordNewPassword() {
    return this.passwordForm.get('passwordNewPassword');
  }

  get passwordNewPassword2() {
    return this.passwordForm.get('passwordNewPassword2');
  }

  get dangerPassword() {
    return this.dangerForm.get('dangerPassword');
  }
}
