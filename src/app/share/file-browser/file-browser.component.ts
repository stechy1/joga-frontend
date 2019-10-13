import { Component, OnInit } from '@angular/core';
import { DialogChildComponent } from '../modal/dialog-child.component';
import { ModalComponent } from '../modal/modal.component';
import { FileBrowserService } from './file-browser.service';
import { FileRecord } from './file-record';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.css']
})
export class FileBrowserComponent extends DialogChildComponent implements OnInit {

  files: FileRecord[] = [];
  folders: BehaviorSubject<FileRecord[]> = new BehaviorSubject<FileRecord[]>([]);

  fileForm = new FormGroup({
    blob: new FormControl(null, Validators.required)
  });

  private _lastSelectedFile: FileRecord = null;
  private _selectedFile: FileRecord = null;
  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private _service: FileBrowserService) {
    super();
  }

  ngOnInit(): void {
    this.fileForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(!(state !== 'INVALID'));
    });

    this.folders.subscribe(folders => {
      this._service.getContent(folders)
          .then(files => {
            this.files = files;
          });
    });
  }

  bind(modal: ModalComponent) {
    modal.title = 'Prohlížeč souborů';
    modal.confirmText = 'Vložit';
    modal.confirmDisabled = this._formInvalid;
  }

  unbind(modal: ModalComponent) {

  }

  handleCreateFolder() {
    const folderName = prompt('Zadejte název složky', 'nová složka');
    if (folderName && folderName.length > 0) {
      this._service.createFolder(this.folders.getValue(), folderName)
          .then(folder => {
            const folders = this.folders.getValue();
            folders.push(folder);
            this.folders.next(folders);
          });
    }
  }

  handleFileEntryClick(file: FileRecord) {
    // Kliknu znovu na jeden a ten samý soubor
    if (this._lastSelectedFile === file) {
      this._lastSelectedFile.selected = !this._lastSelectedFile.selected;
      return;
    }

    // Kliknul jsem na jiný, takže nejdříve odznačím předchozí
    if (this._lastSelectedFile !== null) {
      this._lastSelectedFile.selected = false;
    }

    if (file.isDirectory) {
      const folders = this.folders.getValue();
      folders.push(file);
      this.folders.next(folders);
      return;
    }

    file.selected = true;
    this._lastSelectedFile = file;
  }

  handleDeleteFile(file: FileRecord) {

  }

  handleShowDir(folder: FileRecord = null) {
    if (folder === null) {
      this.folders.next([]);
      return;
    }

    const folders = this.folders.getValue();
    for (let i = folders.length - 1; i <= 0; i--) {
      const subfolder: FileRecord = folders[i];
      if (subfolder.name === folder.name) {
        break;
      }
      folders.splice(i);
    }

    this.folders.next(folders);
  }
}
