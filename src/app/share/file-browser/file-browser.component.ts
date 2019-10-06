import { Component, OnInit } from '@angular/core';
import { DialogChildComponent } from '../modal/dialog-child.component';
import { ModalComponent } from '../modal/modal.component';
import { FileBrowserService } from './file-browser.service';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.css']
})
export class FileBrowserComponent extends DialogChildComponent implements OnInit {


  constructor(private _service: FileBrowserService) {
    super();
  }

  ngOnInit(): void {
    this._service.getContent('')
        .then(files => {
          console.log(files);
        });
  }


  bind(param: ModalComponent) {

  }

  unbind(param: ModalComponent) {

  }


}
