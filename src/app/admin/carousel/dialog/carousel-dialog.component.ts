import { DialogChildComponent } from '../../../share/modal/dialog-child.component';
import { ModalComponent } from '../../../share/modal/modal.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarouselService } from '../carousel.service';
import { NGXLogger } from 'ngx-logger';

export abstract class CarouselDialogComponent extends DialogChildComponent implements OnInit {

  @ViewChild('image', {static: true}) image: ElementRef<HTMLImageElement>;
  isNew = true;

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _modal: ModalComponent;

  protected carouselForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    blob: new FormControl(null, Validators.required)
  });

  constructor(protected _service: CarouselService,
              private logger: NGXLogger) {
    super();
  }

  private _handleConfirmLecture() {
    this.handleConfirmLecture()
        .then(() => this._modal.close())
        .catch(reason => this.logger.error(reason));
  }

  ngOnInit() {
    this.carouselForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(!(state !== 'INVALID'));
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
    this.carouselForm.patchValue({
      blob: target.files[0]
    });
  }

}
