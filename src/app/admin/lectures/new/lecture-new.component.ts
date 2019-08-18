import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trainer } from '../trainer';
import { LectureService } from '../lecture.service';
import { DialogChildComponent } from '../../../share/modal/dialog-child.component';
import { ModalComponent } from '../../../share/modal/modal.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { dateToISOFormat } from '../../../share/string-utils';

@Component({
  selector: 'app-admin-lecture-new',
  templateUrl: './lecture-new.component.html',
  styleUrls: ['./lecture-new.component.css']
})
export class LectureNewComponent extends DialogChildComponent implements OnInit {

  trainers: Trainer[] = [];
  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _closeFunction: () => void;
  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);

  newLectureForm = new FormGroup({
    trainer: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    max_persons: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
  });

  constructor(private _lectureService: LectureService) {
    super();
  }

  private _prepareForm(date: Date) {
    this.newLectureForm.patchValue({
      start_time: dateToISOFormat(date)
    });
  }

  ngOnInit() {
    this.newLectureForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(state === 'INVALID');
    });

    this._lectureService.allTrainers()
        .then(trainers => {
          this.trainers = trainers;
        })
        .catch(reason => console.log(reason));
  }

  bind(modal: ModalComponent) {
    modal.title = 'Nová lekce';
    modal.confirmText = 'Založit';
    modal.cancelText = 'Zrušit';
    modal.confirmClose = true;
    this._confirmSubscription =  modal.confirm.subscribe(() => this.handleCreateLecture());
    this._cancelSubscription =  modal.cancel.subscribe(() => modal.close());
    this._showSubscription =  modal.show.subscribe((args) => this._prepareForm(args[0]));
    modal.confirmDisabled = this._formInvalid;
    this._closeFunction = modal.close;
  }

  unbind() {
    this._confirmSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
    this._closeFunction = null;
  }

  handleCreateLecture() {
    this._lectureService.insert(this.newLectureForm.value)
        .then(() => this._closeFunction())
        .catch(reason => console.log(reason));
    return false;
  }
}
