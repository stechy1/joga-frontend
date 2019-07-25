import { Pipe, PipeTransform } from '@angular/core';
import { Months } from './calendar.utils';

@Pipe({
  name: 'monthYearTitle'
})
export class MonthYearTitlePipe implements PipeTransform {

  transform(value: Date, ...args: any[]): any {
    return Months.getFullName(value.getMonth()) + ', ' + value.getFullYear();
  }

}
