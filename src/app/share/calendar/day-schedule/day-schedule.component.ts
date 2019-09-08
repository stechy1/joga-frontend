import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DayAction } from '../day-action';
import { AuthService } from '../../../auth/auth.service';
import { UserRole } from '../../../auth/user';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent implements OnInit {

  @Input() actions: DayAction[];
  @Output() newLecture: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateDayAction: EventEmitter<DayAction> = new EventEmitter<DayAction>();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  get isClient(): boolean {
    return this._authService.user.getValue().role === UserRole.CLIENT;
  }

  get isAdmin(): boolean {
    return this._authService.user.getValue().role === UserRole.ADMIN;
  }

  handleNewLecture() {
    this.newLecture.next();
  }

  handleUpdateDayAction(dayAction: DayAction) {
    this.updateDayAction.next(dayAction);
  }
}
