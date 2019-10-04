import { Component, OnInit, ViewChild } from '@angular/core';
import { LecturesService } from './lectures.service';
import { DayAction } from '../../share/calendar/day-action';
import { mapLectureToDayAction } from '../../share/general-utils';
import { BehaviorSubject } from 'rxjs';
import { ConfirmDialogComponent } from '../../share/modal/confirm/confirm-dialog.component';
import { ModalComponent } from '../../share/modal/modal.component';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  dayActions: BehaviorSubject<DayAction[]> = new BehaviorSubject<DayAction[]>([]);

  constructor(private _service: LecturesService) { }

  ngOnInit() {
    this._service.myLectures()
        .then(lectures => {
          const dayActions = lectures.map(lecture => mapLectureToDayAction(lecture));
          this.dayActions.next(dayActions);
        });
  }

  handleCancelDayAction(dayAction: DayAction): void {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete se odhlásit z lekce?',
      confirm: () => self._service.cancel(dayAction)
    });
  }
}
