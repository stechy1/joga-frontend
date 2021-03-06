import { DialogChildComponent } from '../../../share/modal/dialog-child.component';
import { ModalComponent } from '../../../share/modal/modal.component';
import { LectureTypesService } from '../lecture-types.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { BUTTON_BOLD, BUTTON_ITALIC, BUTTON_LINK, BUTTON_ORDERED_LIST, BUTTON_QUOTES, BUTTON_STRIKETHROUGH, BUTTON_UNORDERED_LIST } from '../../../share/markdown-editor/editor-toolbar/toolbar-buttons';

export abstract class LectureTypesDialogComponent extends DialogChildComponent implements OnInit {

  @ViewChild('image', {static: true}) image: ElementRef<HTMLImageElement>;
  isNew = true;
  buttons = {};

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _modal: ModalComponent;

  protected lectureTypeForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    blob: new FormControl(null)
  });

  constructor(protected _lectureTypesService: LectureTypesService,
              protected logger: NGXLogger) {
    super();

    this.buttons[BUTTON_BOLD.icon] = BUTTON_BOLD;
    this.buttons[BUTTON_ITALIC.icon] = BUTTON_ITALIC;
    this.buttons[BUTTON_STRIKETHROUGH.icon] = BUTTON_STRIKETHROUGH;
    this.buttons[BUTTON_QUOTES.icon] = BUTTON_QUOTES;
    this.buttons[BUTTON_ORDERED_LIST.icon] = BUTTON_ORDERED_LIST;
    this.buttons[BUTTON_UNORDERED_LIST.icon] = BUTTON_UNORDERED_LIST;
    this.buttons[BUTTON_LINK.icon] = BUTTON_LINK;
  }

  private _handleConfirmLectureType() {
    this.handleConfirmLectureType()
        .then(() => this._modal.close())
        .catch(reason => this.logger.error(reason));

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

  onFilesAdded(event) {
    const target = event.target;

    const reader = new FileReader();
    reader.onload = () => {
      this.image.nativeElement.src = reader.result as string;
    };
    reader.onerror = (reason) => {
      this.logger.error(reason);
    };
    reader.readAsDataURL(target.files[0]);
    this.lectureTypeForm.patchValue({
      blob: target.files[0]
    });
  }

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
