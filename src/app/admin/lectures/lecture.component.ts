import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LectureService } from './lecture.service';
import { DayAction } from '../../share/calendar/day-action';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModalComponent } from '../../share/modal/modal.component';
import { LectureNewComponent } from './dialog/lecture-new.component';
import { LectureUpdateComponent } from './dialog/lecture-update.component';
import { ConfirmDialogComponent } from '../../share/modal/confirm/confirm-dialog.component';
import { mapLectureToDayAction } from '../../share/general-utils';
import { DayActionCrud } from '../../share/calendar/day-action-crud';

@Component({
  selector: 'app-admin-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit, OnDestroy, DayActionCrud {

  dayActions: BehaviorSubject<DayAction[]> = new BehaviorSubject<DayAction[]>([]);

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  private _lectureChangeSubscription: Subscription;
  private _viewDate: Date;

  constructor(private _lectureService: LectureService) { }

  ngOnInit() {
    this._lectureChangeSubscription = this._lectureService.lectures.subscribe(lectures => {
        const dayActions = lectures.map(lecture => mapLectureToDayAction(lecture));
        this.dayActions.next(dayActions);
      }
    );
  }

  ngOnDestroy(): void {
    this._lectureChangeSubscription.unsubscribe();
  }

  changeViewDate(date: Date) {
    this._viewDate = date;
    this._lectureService.all(date);
  }

  // -------------- DayActionCrud implementation --------------

  create(date: Date): void {
    this.modal.showComponent = LectureNewComponent;
    this.modal.open(date);
  }

  update(dayAction: DayAction): void {
    this.modal.showComponent = LectureUpdateComponent;
    this.modal.open(dayAction.id);
  }

  delete(dayAction: DayAction): void {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'Opravdu si přejete smazat vybranou lekci?',
      confirm: () => self._lectureService.delete(dayAction.id)
    });
  }

  // ----------- end of dayActionCrud implementation ----------
}
