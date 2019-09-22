import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { ActivatedRoute } from '@angular/router';
import { LectureType } from '../general.share';

@Component({
  selector: 'app-lecture-type',
  templateUrl: './lecture-type.component.html',
  styleUrls: ['./lecture-type.component.css']
})
export class LectureTypeComponent implements OnInit {

  lectureType: LectureType;

  constructor(private _service: GeneralService, private _route: ActivatedRoute) { }

  ngOnInit() {
    const lectureId = this._route.snapshot.params.id;
    this._service.lectureTypeById(lectureId)
        .then(lectureType => {
          this.lectureType = lectureType;
        });
  }

}
