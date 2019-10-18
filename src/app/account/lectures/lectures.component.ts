import { Component, OnInit, ViewChild } from '@angular/core';
import { LecturesService } from './lectures.service';
import { DayAction } from '../../share/calendar/day-action';
import { mapLectureToDayAction } from '../../share/general-utils';
import { BehaviorSubject } from 'rxjs';
import { ConfirmDialogComponent } from '../../share/modal/confirm/confirm-dialog.component';
import { ModalComponent } from '../../share/modal/modal.component';
import { AuthService } from '../../auth/auth.service';
import { PersonalService } from '../personal/personal.service';
import { PersonalData } from '../personal/personalData';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  dayActions: BehaviorSubject<DayAction[]> = new BehaviorSubject<DayAction[]>([]);
  isAccountChecked = false;

  constructor(private _service: LecturesService, private _personalService: PersonalService) { }

  ngOnInit() {
    this._personalService.getPersonalData().then(personalData => {
      this.isAccountChecked = personalData.checked === 1;
    });
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
                         .then(action => {
                           const actions = this.dayActions.getValue();
                           const index = actions.findIndex(value => action.id === value.id);
                           if (index !== -1) {
                             actions.splice(index, 1);
                             this.dayActions.next(actions);
                           }
                         })
    });
  }

}
