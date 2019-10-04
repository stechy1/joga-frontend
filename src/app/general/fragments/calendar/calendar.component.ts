import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DayAction } from '../../../share/calendar/day-action';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from '../../general.service';
import { mapLectureToDayAction } from '../../../share/general-utils';
import { ViewType } from '../../../share/calendar/calendar.utils';
import { DayActionCrud } from '../../../share/calendar/day-action-crud';
import { LecturesService } from '../../../account/lectures/lectures.service';
import { ModalComponent } from '../../../share/modal/modal.component';
import { ConfirmDialogComponent } from '../../../share/modal/confirm/confirm-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, DayActionCrud {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  dayActions: BehaviorSubject<DayAction[]> = new BehaviorSubject<DayAction[]>([]);

  private _viewType: ViewType = ViewType.MONTH;

  constructor(private _lecturesService: LecturesService) { }

  ngOnInit() {

  }

  changeViewDate(date: Date) {
    this._lecturesService.lectures(date, this._viewType)
        .then(lectures => {
          const dayActions = lectures.map(lecture => mapLectureToDayAction(lecture));
          this.dayActions.next(dayActions);
        });
  }

  handleChangeViewType(viewType: ViewType) {
    this._viewType = viewType;
  }

  // -------------- DayActionCrud implementation --------------

  assign(dayAction: DayAction): void {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete se přihlásit na lekci?',
      confirm: () => self._lecturesService.assign(dayAction)
    });
  }

  cancel(dayAction: DayAction): void {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete se odhlásit z lekce?',
      confirm: () => self._lecturesService.cancel(dayAction)
    });
  }

}
