import { Component, Input, OnInit} from '@angular/core';
import { DayAction } from '../day-action';
import { AuthService } from '../../../auth/auth.service';
import { UserRole } from '../../../auth/user';
import { DayActionCrud } from '../day-action-crud';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent implements OnInit {

  private static readonly TODAY: Date = new Date();

  @Input() actions: DayAction[];
  @Input() dayAction: DayActionCrud;
  @Input() date: Date;

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
  }

  get isClient(): boolean {
    return this._authService.user.getValue().role === UserRole.CLIENT;
  }

  get isLector(): boolean {
    return this._authService.user.getValue().role >= UserRole.LECTOR;
  }

  handleNewDayAction() {
    const corectedDate = new Date(this.date.getTime());
    corectedDate.setMonth(corectedDate.getMonth() + 1);
    this.dayAction.create(corectedDate);
  }

  handleUpdateDayAction(dayAction: DayAction) {
    this.dayAction.update(dayAction);
  }

  handlePublishDayAction(action: DayAction) {
    this.dayAction.publish(action);
  }

  handleDeleteDayAction(dayAction: DayAction) {
    this.dayAction.delete(dayAction);
  }

  canAssign(dayAction: DayAction) {
    return dayAction.reserved < dayAction.capacity;
  }

  isLate(date: Date): boolean {
    return DayScheduleComponent.TODAY > date;
  }

  handleAssignDayAction(dayAction: DayAction) {
    this.dayAction.assign(dayAction);
  }

  handleCancelDayAction(dayAction: DayAction) {
    this.dayAction.cancel(dayAction);
  }
}
