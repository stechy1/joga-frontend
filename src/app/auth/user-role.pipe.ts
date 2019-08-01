import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from './user';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: UserRole): string {
    return UserRole[value];
  }

}
