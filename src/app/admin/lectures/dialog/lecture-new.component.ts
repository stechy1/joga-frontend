import { LectureDialogComponent } from './lecture-dialog.component';
import { Component } from '@angular/core';
import { formValueToLecture } from './lecture-dialog.utils';
import { dateToISOFormat } from '../../../share/string-utils';
import { ModalComponent } from '../../../share/modal/modal.component';

@Component({
  templateUrl: './lecture-dialog.component.html'
})
export class LectureNewComponent extends LectureDialogComponent {

  bind(modal: ModalComponent) {
    super.bind(modal);
    modal.title = 'Nová lekce';
    modal.confirmText = 'Založit';
    modal.cancelText = 'Zrušit';
  }

  protected prepareForm(date: Date) {
    this.lectureForm.patchValue({
      lecture_day: dateToISOFormat(date)
    });
  }

  protected handleConfirmLecture() {
    return this._lectureService.insert(formValueToLecture(this.lectureForm.value))
  }

}
