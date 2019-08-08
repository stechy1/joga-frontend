import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  private _formValid = new BehaviorSubject(false);

  private _confirmSubscription: Subscription;
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

  unbind() {
    this._confirmSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
  }

  bind(modal: ModalComponent) {
    modal.title = 'Nový obrázek';
    modal.confirmText = 'Nahrát';
    modal.cancelText = 'Zrušit';
    modal.confirmClose = false;
    this._confirmSubscription = modal.confirm.subscribe(() => this.handleUploadImage());
    this._showSubscription = modal.show.subscribe(() => this.prepareForm());
    modal.confirmDisabled = this._formValid;
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
      const dataURL = reader.result as string;
      this.image.nativeElement.src = dataURL;
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
    }).catch(reason => console.log(reason));
  }
}
