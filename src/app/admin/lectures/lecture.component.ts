import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LectureService } from './lecture.service';
import { DayAction } from '../../share/calendar/day-action';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModalComponent } from '../../share/modal/modal.component';
import { LectureNewComponent } from './dialog/new/lecture-new.component';
import { LectureChangeEvent, LectureChangeType } from './lecture-change-event';
import { Lecture } from './lecture';
import { LectureUpdateComponent } from './dialog/update/lecture-update.component';
import { LectureDeleteComponent } from './dialog/delete/lecture-delete.component';

@Component({
  selector: 'app-admin-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit, OnDestroy {

  dayActions: BehaviorSubject<DayAction[]> = new BehaviorSubject<DayAction[]>([]);

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  private _lectureChangeSubscription: Subscription;

  constructor(private _calendarService: LectureService) { }

  private static _mapLectureToDayAction(lecture: Lecture): DayAction {
    const timeStart = new Date(lecture.time_start * 1000);
    const timeEnd = new Date(lecture.time_end * 1000);
    return {
      id: lecture.lecture_id,
      dayIndex: timeStart.getDate(),
      name: lecture.lecture_name,
      timeStart: timeStart,
      timeEnd: timeEnd,
      reserved: lecture.reserved_clients,
      capacity: lecture.max_persons
    } as DayAction;
  }

  private _lectureChangeHandler(event: LectureChangeEvent): void {
    if (event === null) {
      return;
    }

    const dayAction = LectureComponent._mapLectureToDayAction(event.lecture);
    const actions: DayAction[] = this.dayActions.getValue();
    const actionIndex = actions.findIndex(action => action.id === dayAction.id);
    switch (event.changeType) {
      case LectureChangeType.INSERT:
        if (actionIndex !== -1) {
          console.error(`Denní akce s ID: ${actionIndex} již existuje!`);
          return;
        }

        actions.push(dayAction);
        this.dayActions.next(actions);
        break;
      case LectureChangeType.UPDATE:
        if (actionIndex === -1) {
          console.error(`Nebyla nalezena denní akce s ID: ${actionIndex}`);
          return;
        }
        actions[actionIndex] = dayAction;
        this.dayActions.next(actions);
        break;
      case LectureChangeType.DELETE:
        if (actionIndex === -1) {
          console.error(`Nebyla nalezena denní akce s ID: ${actionIndex}`);
          return;
        }

        actions.splice(actionIndex, 1);
        this.dayActions.next(actions);
        break;
    }
  }

  ngOnInit() {
    this._lectureChangeSubscription = this._calendarService.lectureChangeEmmiter.subscribe(change => this._lectureChangeHandler(change));
  }

  ngOnDestroy(): void {
    this._lectureChangeSubscription.unsubscribe();
  }

  changeViewDate(date: Date) {
    this._calendarService.all(date)
        .then(lectures => lectures.map(lecture => LectureComponent._mapLectureToDayAction(lecture)))
        .then(dayActions => this.dayActions.next(dayActions))
        .catch(reason =>  console.error(reason));
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
    this.modal.showComponent = LectureDeleteComponent;
    this.modal.open(dayAction.id);
  }
}
