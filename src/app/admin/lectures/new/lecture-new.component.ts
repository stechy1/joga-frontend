import { Component, OnInit, ViewChild } from '@angular/core';
import { Lecture } from '../lecture';
import { FormControl, Validators } from '@angular/forms';
import { Trainer } from '../trainer';
import { LectureService } from '../lecture.service';

@Component({
  selector: 'app-admin-lecture-new',
  templateUrl: './lecture-new.component.html',
  styleUrls: ['./lecture-new.component.css']
})
export class LectureNewComponent implements OnInit {

  @ViewChild('f', {static: true}) form: FormControl;

  model: Lecture;
  trainers: Trainer[] = [];

  constructor(private _lectureService: LectureService) {
    this.model = {
      trainer: null,
      start_time: null,
      duration: null,
      max_persons: null,
      place: null,
    };
  }

  ngOnInit() {
    this._lectureService.allTrainers()
        .then(trainers => {
          this.trainers = trainers;
        })
        .catch(reason => console.log(reason));
  }

  handleCreateLecture() {
    console.log(JSON.stringify(this.form.value));
    this._lectureService.insert(this.form.value)
        .catch(reason => console.log(reason));
    return false;
  }
}
