import { Pipe, PipeTransform } from '@angular/core';
import { LectureType } from '../general.share';

@Pipe({
  name: 'appLectureTypeImagePath'
})
export class LectureTypePathPipe implements PipeTransform {

  transform(value?: LectureType): string {
    if (value == null) {
      return "";
    }

    return `/public/uploads/lectures/${value.path}`;
  }
}
