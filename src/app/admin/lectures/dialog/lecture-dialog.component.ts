import { OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DialogChildComponent } from '../../../share/modal/dialog-child.component';
import { Trainer } from '../trainer';
import { LectureService } from '../lecture.service';
import { ModalComponent } from '../../../share/modal/modal.component';
import { LectureValidators } from '../lecture-validators';
import { LectureType } from '../../lecture-types/lecture-type';
import { LectureTypesService } from '../../lecture-types/lecture-types.service';

export abstract class LectureDialogComponent extends DialogChildComponent implements OnInit {

  trainers: Trainer[] = [];
  lectureTypes: LectureType[] = [];

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _modal: ModalComponent;

  protected lectureForm = new FormGroup({
    lecture_id: new FormControl(''),
    trainer: new FormControl('', [Validators.required]),
    lecture_day: new FormControl('', [Validators.required],
      LectureValidators.createDateValidator(this._lectureService).bind(this)),
    time_start: new FormControl('',
      [Validators.required, LectureValidators.createLectureStartAfterEndValidator()],
      LectureValidators.createLectureTimeValidator(this._lectureService, LectureService.TIME_START_VALIDITY).bind(this)),
    time_end: new FormControl('',
      [Validators.required, LectureValidators.createLectureEndBeforeStartValidator()],
      LectureValidators.createLectureTimeValidator(this._lectureService, LectureService.TIME_END_VALIDITY).bind(this)),
    max_persons: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  });

  constructor(protected _lectureService: LectureService,
              private _lectureTypesService: LectureTypesService) {
    super();
  }

  private _handleConfirmLecture() {
    this.handleConfirmLecture()
        .then(() => this._modal.close())
        .catch(reason => console.log(reason));

  }

  ngOnInit() {
    this.lectureForm.statusChanges.subscribe((state: string) => {
      console.log(state);
      this._formInvalid.next(!(state !== 'INVALID'));
    });

    this._lectureService.allTrainers()
        .then(trainers => {
          this.trainers = trainers;
        })
        .catch(reason => console.log(reason));
    this._lectureTypesService.all()
        .subscribe(types => {
          this.lectureTypes = types;
        });
  }

  bind(modal: ModalComponent) {
    modal.confirmClose = true;
    this._confirmSubscription =  modal.confirm.subscribe(() => this._handleConfirmLecture());
    this._cancelSubscription =  modal.cancel.subscribe(() => modal.close());
    this._showSubscription =  modal.show.subscribe((args) => this.prepareForm(args[0]));
    modal.confirmDisabled = this._formInvalid;
    this._modal = modal;
  }

  unbind() {
    this._confirmSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
    this._modal = null;
  }

  protected abstract prepareForm(value: any);

  protected abstract handleConfirmLecture(): Promise<any>;

  get trainer() {
    return this.lectureForm.get('trainer');
  }
  get lecture_day() {
    return this.lectureForm.get('lecture_day');
  }
  get time_start() {
    return this.lectureForm.get('time_start');
  }
  get time_end() {
    return this.lectureForm.get('time_end');
  }
  get maxPersons() {
    return this.lectureForm.get('max_persons');
  }
  get place() {
    return this.lectureForm.get('place');
  }
  get type() {
    return this.lectureForm.get('type');
  }

}
