import { Component, OnInit } from '@angular/core';
import { DialogChildComponent } from '../../../../share/modal/dialog-child.component';
import { ModalComponent } from '../../../../share/modal/modal.component';
import { BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICarouselImage } from '../../carousel-image';
import { CarouselService } from '../../carousel.service';
import { environment } from '../../../../../environments/environment';

@Component({
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent extends DialogChildComponent implements OnInit {

  uploadForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    path: new FormControl(''),
    enabled: new FormControl(false),
    view_order: new FormControl('-1')
  });
  private _formValid = new BehaviorSubject(false);


  constructor(private _carouselService: CarouselService) {
    super();
  }

  private prepareForm(image: ICarouselImage) {
    console.log(image);
    this.uploadForm.patchValue({
      id: image.id,
      name: image.name,
      description: image.description,
      path: image.path,
      enabled: image.enabled,
      view_order: image.view_order
    });
  }

  private handleUpdate() {
    this._carouselService.update(this.uploadForm.value).catch(reason => console.log(reason));
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
    modal.title = 'Upravit obrázek';
    modal.confirmText = 'Upravit';
    modal.cancelText = 'Zrušit';
    modal.confirm.subscribe(() => this.handleUpdate());
    modal.show.subscribe((args) => this.prepareForm(args[0]));
    modal.confirmDisabled = this._formValid;

  }

  get isProd(): boolean {
    return environment.production;
  }

}
