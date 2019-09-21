import { FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class ShareValidators {

  private constructor() {}

  public static createValidatorSameValues(controlName1: string, controlName2: string): ValidatorFn {
    return ((formGroup: FormGroup): ValidationErrors | null => {
      const value1 = formGroup.get(controlName1).value;
      const value2 = formGroup.get(controlName2).value;

      return value1 !== value2 ? {notSame: true} : null;
    });
  }

  public static getPasswordValidators(): ValidatorFn[] {
    return [Validators.required, Validators.minLength(7)];
  }
}
