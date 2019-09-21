import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarouselService } from '../../carousel.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogChildComponent } from '../../../../share/modal/dialog-child.component';
import { ModalComponent } from '../../../../share/modal/modal.component';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends DialogChildComponent implements OnInit {

  @ViewChild('image', {static: true}) image: ElementRef<HTMLImageElement>;

  uploadForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    imageInput: new FormControl(null, Validators.required)
  });

  private _file: File;
  private _formValid: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _modal: ModalComponent;

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;

  constructor(private _carouselService: CarouselService) {
    super();
  }

  ngOnInit() {
    this.uploadForm.statusChanges
        .pipe(
          map(state => {
            this._formValid.next(state === 'VALID');
          })
        );
  }

  bind(modal: ModalComponent) {
    modal.title = 'Nový obrázek';
    modal.confirmText = 'Nahrát';
    modal.cancelText = 'Zrušit';
    modal.confirmClose = true;
    this._confirmSubscription = modal.confirm.subscribe(() => this.handleUploadImage());
    this._cancelSubscription =  modal.cancel.subscribe(() => modal.close());
    this._showSubscription = modal.show.subscribe(() => this.prepareForm());
    modal.confirmDisabled = this._formValid;
    this._modal = modal;
  }

  unbind() {
    this._confirmSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
    this._modal = null;
  }

  prepareForm() {
    // this.uploadForm.patchValue({
    //   name: '',
    //   description: '',
    //   imageInput: null
    // });
  }

  onFilesAdded(event) {
    const target = event.target;

    const reader = new FileReader();
    reader.onload = () => {
      this.image.nativeElement.src = reader.result as string;
    };
    reader.onerror = (reason) => {
      console.log(reason);
    };
    reader.readAsDataURL(target.files[0]);
    this._file = target.files[0];
  }

  handleUploadImage() {
    this._carouselService.upload({
      name: this.uploadForm.get('name').value,
      description: this.uploadForm.get('description').value,
      imageInput: this._file
    })
        .then(() => this._modal.close())
        .catch(reason => console.log(reason));
  }
}
