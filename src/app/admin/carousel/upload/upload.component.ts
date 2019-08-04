import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CarouselService } from '../carousel.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('image', {static: true}) image: ElementRef<HTMLImageElement>;

  uploadForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    imageInput: new FormControl(null, Validators.required)
  });

  private _file: File;

  constructor(private _carouselService: CarouselService) {}

  ngOnInit() {}

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
