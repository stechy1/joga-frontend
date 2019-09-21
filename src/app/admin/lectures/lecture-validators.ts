import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LectureService } from './lecture.service';
import { Observable } from 'rxjs';

export class LectureValidators {



  static createDateValidator(service: LectureService): AsyncValidatorFn {
    return ((control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return service.checkDateValidity(control.value)
                    .then(valid => {
                      return !valid ? {dateInvalid: true} : null;
                    });
    });
  }

  static createLectureStartAfterEndValidator(): ValidatorFn {
    return ((control: AbstractControl): ValidationErrors | null => {
      if (control.parent === undefined) {
        return null;
      }

      const startTime = new Date(`${control.parent.get('lecture_day').value} ${control.value}`);
      const endTime = new Date(`${control.parent.get('lecture_day').value} ${control.parent.get('time_end').value}`);
      const delta = endTime.getTime() - startTime.getTime();

      return delta < 0 ? {startAfterEnd: true} : null;
    });
  }

  static createLectureEndBeforeStartValidator(): ValidatorFn {
    return ((control: AbstractControl): ValidationErrors | null => {
      if (control.parent === undefined) {
        return null;
      }

      const startTime = new Date(`${control.parent.get('lecture_day').value} ${control.parent.get('time_start').value}`);
      const endTime = new Date(`${control.parent.get('lecture_day').value} ${control.value}`);
      const delta = startTime.getTime() - endTime.getTime();

      return delta > 0 ? {endBeforeStart: true} : null;
    });
  }

  static createLectureTimeValidator(service: LectureService, timePart: string): AsyncValidatorFn {
    return ((control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return service.checkTimeValidity(
        timePart,
        control.parent.get('lecture_day').value,
        control.value,
        control.parent.get('lecture_id').value)
                    .then(valid => {
                      return !valid ? {timeConflict: true} : null;
                    });
    });
  }
}
