import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LectureService } from './lecture.service';
import { DayAction } from '../../share/calendar/day-action';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModalComponent } from '../../share/modal/modal.component';
import { LectureNewComponent } from './dialog/new/lecture-new.component';
import { LectureChangeEvent, LectureChangeType } from './lecture-change-event';
import { Lecture } from './lecture';

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
    const startTime = new Date(lecture.start_time * 1000);
    return {
      id: lecture.id,
      dayIndex: startTime.getDate(),
      name: lecture.lecture_name,
      timeStart: startTime,
      duration: lecture.duration,
      reserved: lecture.reserved_clients,
      capacity: lecture.max_persons
    } as DayAction;
  }

  private _lectureChangeHandler(event: LectureChangeEvent): void {
    if (event === null) {
      return;
    }

    const dayAction = LectureComponent._mapLectureToDayAction(event.lecture);
    switch (event.changeType) {
      case LectureChangeType.INSERT:
        const actions = this.dayActions.getValue();
        actions.push(dayAction);
        this.dayActions.next(actions);
        break;
      case LectureChangeType.UPDATE:
          break;
      case LectureChangeType.DELETE:
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
}
