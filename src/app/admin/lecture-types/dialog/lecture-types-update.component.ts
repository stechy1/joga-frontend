import { LectureTypesDialogComponent } from './lecture-types-dialog.component';
import { Component } from '@angular/core';
import { ModalComponent } from '../../../share/modal/modal.component';
import { LectureTypesService } from '../lecture-types.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  templateUrl: './lecture-types-dialog.component.html'
})
export class LectureTypesUpdateComponent extends LectureTypesDialogComponent {


  constructor(lectureTypesService: LectureTypesService, logger: NGXLogger) {
    super(lectureTypesService, logger);
  }

  bind(modal: ModalComponent) {
    super.bind(modal);
    modal.title = 'Upravit typ lekce';
    modal.confirmText = 'Upravit';
    modal.cancelText = 'Zrušit';
  }

  protected prepareForm(lectureTypeId: number) {
    this.isNew = false;
    this._lectureTypesService.byId(lectureTypeId)
        .then(lectureType => {
          this.lectureTypeForm.patchValue(lectureType);
          (this.image.nativeElement as HTMLImageElement).src = `/public/uploads/lectures/${lectureType.path}`;
        })
        .catch(reason => {
          this.logger.error(reason);
        });
    this.lectureTypeForm.get('blob').validator = null;
    this.lectureTypeForm.get('blob').disable();
  }

  protected handleConfirmLectureType(): Promise<any> {
    return this._lectureTypesService.update(this.lectureTypeForm.value);
  }

}
