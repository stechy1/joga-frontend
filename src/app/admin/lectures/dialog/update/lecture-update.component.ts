import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../trainer';
import { LectureService, LectureType } from '../../lecture.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModalComponent } from '../../../../share/modal/modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateTimeToISOFormat } from '../../../../share/string-utils';
import { DialogChildComponent } from '../../../../share/modal/dialog-child.component';
import { LectureValidators } from '../../lecture-validators';
import { formValueToLecture, lectureToFormValue } from '../lecture-dialog.utils';

@Component({
  selector: 'app-lecture-update',
  templateUrl: './lecture-update.component.html',
  styleUrls: ['./lecture-update.component.css']
})
export class LectureUpdateComponent extends DialogChildComponent implements OnInit {

  trainers: Trainer[] = [];
  lectureTypes: LectureType[] = [];

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _modal: ModalComponent;

  updateLectureForm = new FormGroup({
    lecture_id: new FormControl(''),
    trainer: new FormControl('', [Validators.required]),
    lecture_day: new FormControl('', [Validators.required], LectureValidators.createDateValidator(this._lectureService).bind(this)),
    time_start: new FormControl('', [Validators.required]),
    time_end: new FormControl('', [Validators.required]),
    max_persons: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  }, null,  /*LectureValidators.createDurationValidator(this._lectureService).bind(this)*/);

  constructor(private _lectureService: LectureService) {
    super();
  }

  private _prepareForm(lectureId: number) {
    this._lectureService.byId(lectureId)
        .then(lecture => {
          this.updateLectureForm.patchValue(lectureToFormValue(lecture));
        })
        .catch(reason => {
          console.log(reason);
        });
  }

  ngOnInit() {
    this.updateLectureForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(state === 'INVALID');
    });

    this._lectureService.allTrainers()
        .then(trainers => {
          this.trainers = trainers;
        })
        .catch(reason => console.log(reason));
    this._lectureService.allLectureTypes()
        .then(types => {
          this.lectureTypes = types;
        })
        .catch(reason => console.log(reason));
  }

  bind(modal: ModalComponent) {
    modal.title = 'Upravení lekce';
    modal.confirmText = 'Upravit';
    modal.cancelText = 'Zrušit';
    modal.confirmClose = true;
    this._confirmSubscription =  modal.confirm.subscribe(() => this.handleCreateLecture());
    this._cancelSubscription =  modal.cancel.subscribe(() => modal.close());
    this._showSubscription =  modal.show.subscribe((args) => this._prepareForm(args[0]));
    modal.confirmDisabled = this._formInvalid;
    this._modal = modal;
  }

  unbind() {
    this._confirmSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
    this._modal = null;
  }

  handleCreateLecture() {
    this._lectureService.update(formValueToLecture(this.updateLectureForm.value))
        .then(() => this._modal.close())
        .catch(reason => console.log(reason));
    return false;
  }

  get trainer() {
    return this.updateLectureForm.get('trainer');
  }
  get lecture_day() {
    return this.updateLectureForm.get('lecture_day');
  }
  get time_start() {
    return this.updateLectureForm.get('time_start');
  }
  get time_end() {
    return this.updateLectureForm.get('time_end');
  }
  get maxPersons() {
    return this.updateLectureForm.get('max_persons');
  }
  get place() {
    return this.updateLectureForm.get('place');
  }
  get type() {
    return this.updateLectureForm.get('type');
  }

}
