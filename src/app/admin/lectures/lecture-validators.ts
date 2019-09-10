import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { LectureService } from './lecture.service';
import { Observable } from 'rxjs';

export class LectureValidators {
  static createDateValidator(service: LectureService): AsyncValidatorFn {
    return ((control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return service.checkDateValidity(control.value)
                    .then(valid => {
                      return !valid ? {'dateInvalid': true} : null;
                    });
    });
  }

  static createDurationValidator(service: LectureService): AsyncValidatorFn {
    return ((formGroup: FormGroup): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const control = formGroup.get('time_end');

      if (control.errors) {
        return new Promise(resolve => null);
      }

      return service.checkDurationValidity(formGroup.get('time_start').value, formGroup.get('time_end').value)
                    .then(valid => {
                      control.setErrors(!valid ?{'timeConflict': true} : null);
                      return !valid ? {'timeConflict': true} : null;
                    });
    });
  }
}
