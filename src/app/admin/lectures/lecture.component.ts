import { Component, OnInit } from '@angular/core';
import { LectureService } from './lecture.service';

@Component({
  selector: 'app-admin-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  constructor(private _calendarService: LectureService) { }

  ngOnInit() {

  }

  check() {
    this._calendarService.all()
        .then(value => console.log(value))
        .catch(reason =>  console.error(reason));
  }
}
