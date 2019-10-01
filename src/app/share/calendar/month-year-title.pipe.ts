import { Pipe, PipeTransform } from '@angular/core';
import { Days, getWeek, Months, ViewType } from './calendar.utils';

@Pipe({
  name: 'monthYearTitle'
})
export class MonthYearTitlePipe implements PipeTransform {

  transform(value: Date, viewType: ViewType): any {
    console.log(value);
    switch (viewType) {
      case ViewType.MONTH:
        return `${Months.getFullName(value.getMonth())}, ${value.getFullYear()}`;
      case ViewType.WEEK:
        return `${getWeek(value.getTime())}. týden, ${value.getFullYear()}`;
      case ViewType.AGENDA:
        return `${Days.getFullName(value.getDay() + 6)}, ${value.getDate()}.${value.getMonth() + 1}. ${value.getFullYear()}`;
    }
  }

}
