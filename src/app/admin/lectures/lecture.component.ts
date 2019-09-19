import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LectureService } from './lecture.service';
import { DayAction } from '../../share/calendar/day-action';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModalComponent } from '../../share/modal/modal.component';
import { LectureNewComponent } from './dialog/lecture-new.component';
import { LectureChangeEvent, LectureChangeType } from './lecture-change-event';
import { Lecture } from '../../share/lecture';
import { LectureUpdateComponent } from './dialog/lecture-update.component';
import { ConfirmDialogComponent } from '../../share/modal/confirm/confirm-dialog.component';
import { map, tap } from 'rxjs/operators';
import { mapLectureToDayAction } from '../../share/general-utils';

@Component({
  selector: 'app-admin-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit, OnDestroy {

  dayActions: BehaviorSubject<DayAction[]> = new BehaviorSubject<DayAction[]>([]);

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  private _lectureChangeSubscription: Subscription;

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
    this._lectureService.all(date)
  }

  handleNewLecture(date: Date) {
    this.modal.showComponent = LectureNewComponent;
    this.modal.open(date);
  }

  handleUpdateLecture(dayAction: DayAction) {
    this.modal.showComponent = LectureUpdateComponent;
    this.modal.open(dayAction.id);
  }

  handleDeleteLecture(dayAction: DayAction) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      'message': 'Opravdu si přejete smazat vybranou lekci?',
      'confirm': () => self._lectureService.delete(dayAction.id)
    });
  }
}
