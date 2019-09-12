import { Component, OnInit, ViewChild } from '@angular/core';
import { LectureTypesService } from './lecture-types.service';
import { LectureType } from './lecture-type';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../../share/modal/modal.component';
import { LectureTypesNewComponent } from './dialog/lecture-types-new.component';
import { LectureTypesUpdateComponent } from './dialog/lecture-types-update.component';
import { ConfirmDialogComponent } from '../../share/modal/confirm/confirm-dialog.component';

@Component({
  selector: 'app-lecture-types',
  templateUrl: './lecture-types.component.html',
  styleUrls: ['./lecture-types.component.css']
})
export class LectureTypesComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  private _lectures: LectureType[] = [];

  constructor(private _service: LectureTypesService) { }

  ngOnInit() {
    this._service.all().subscribe(lectures => {
      this._lectures = lectures;
    });
  }

  get lectures(): LectureType[] {
    return this._lectures;
  }

  get isProd(): boolean {
    return environment.production;
  }

  handleShowLectureTypeDialog(index?: number) {
    this.modal.showComponent = index === undefined ? LectureTypesNewComponent : LectureTypesUpdateComponent;
    this.modal.open(index);
  }

  handleDeleteLectureType(index: number) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      'message': 'Opravdu si přejete smazat vybranou lekci?',
      'confirm': () => self._service.delete(index)
    });
  }
}
