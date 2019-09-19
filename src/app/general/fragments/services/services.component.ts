import { Component, OnInit } from '@angular/core';
import { LectureType } from '../../general.share';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  lectureTypes: LectureType[] = [];

  constructor(private _service: GeneralService) { }

  ngOnInit() {
    this._service.lectureTypes()
        .then(lectureTypes => {
          this.lectureTypes = lectureTypes;
        });

  }

}
