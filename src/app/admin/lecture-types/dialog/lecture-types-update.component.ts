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
    this._lectureTypesService.byId(lectureTypeId)
        .then(lectureType => {
          this.lectureTypeForm.patchValue(lectureType);
        })
        .catch(reason => {
          this.logger.error(reason);
        });
  }

  protected handleConfirmLectureType(): Promise<any> {
    return this._lectureTypesService.update(this.lectureTypeForm.value);
  }

}
