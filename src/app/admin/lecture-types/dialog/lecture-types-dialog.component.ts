import { DialogChildComponent } from '../../../share/modal/dialog-child.component';
import { ModalComponent } from '../../../share/modal/modal.component';
import { LectureTypesService } from '../lecture-types.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export abstract class LectureTypesDialogComponent extends DialogChildComponent implements OnInit {

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _modal: ModalComponent;

  protected lectureTypeForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required])
  });

  constructor(protected _lectureTypesService: LectureTypesService) {
    super();
  }

  private _handleConfirmLectureType() {
    this.handleConfirmLectureType()
        .then(() => this._modal.close())
        .catch(reason => console.log(reason));

  }

  ngOnInit(): void {
    this.lectureTypeForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(!(state !== 'INVALID'));
    });
  }

  bind(modal: ModalComponent) {
    modal.confirmClose = true;
    this._confirmSubscription =  modal.confirm.subscribe(() => this._handleConfirmLectureType());
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

  protected abstract handleConfirmLectureType(): Promise<any>;

  get id() {
    return this.lectureTypeForm.get('id');
  }

  get name() {
    return this.lectureTypeForm.get('name');
  }

  get description() {
    return this.lectureTypeForm.get('description');
  }

  get price() {
    return this.lectureTypeForm.get('price');
  }

}
