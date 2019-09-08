import { AbstractControl } from '@angular/forms';
import { LectureService } from './lecture.service';

export class LectureValidators {
  static createDateValidator(service: LectureService) {
    return (control: AbstractControl) => {
      return service.checkDateValidity(control.value);
      // return service.checkEmailNotTaken(control.value).map(res => {
      //   return res ? null : { emailTaken: true };
      // });
    };
  }

}
