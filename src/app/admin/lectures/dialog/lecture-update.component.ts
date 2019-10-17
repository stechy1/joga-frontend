import { LectureDialogComponent } from './lecture-dialog.component';
import { Component } from '@angular/core';
import { formValueToLecture, lectureToFormValue } from './lecture-dialog.utils';
import { ModalComponent } from '../../../share/modal/modal.component';
import { LectureService } from '../lecture.service';
import { LectureTypesService } from '../../lecture-types/lecture-types.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  templateUrl: './lecture-dialog.component.html'
})
export class LectureUpdateComponent extends LectureDialogComponent {


  constructor(lectureService: LectureService, lectureTypesService: LectureTypesService, logger: NGXLogger) {
    super(lectureService, lectureTypesService, logger);
  }

  bind(modal: ModalComponent) {
    super.bind(modal);
    modal.title = 'Upravení lekce';
    modal.confirmText = 'Upravit';
    modal.cancelText = 'Zrušit';
  }

  protected prepareForm(lectureId: number) {
    this._lectureService.byId(lectureId)
        .then(result => {
          this.lectureForm.patchValue(lectureToFormValue(result.lecture));
        })
        .catch(reason => {
          this.logger.error(reason);
        });
  }

  protected handleConfirmLecture(): Promise<any> {
    return this._lectureService.update(formValueToLecture(this.lectureForm.value));
  }

}
