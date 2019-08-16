import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lectureStart'
})
export class LectureStartPipe implements PipeTransform {

  transform(value: Date): string {
    return value.getHours() + ':' + value.getMinutes();
  }

}
