import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../general.service';
import { ActivatedRoute } from '@angular/router';
import { LectureType } from '../general.share';
import { MarkdownService } from '../../share/markdown-editor/markdown.service';

@Component({
  selector: 'app-lecture-type',
  templateUrl: './lecture-type.component.html',
  styleUrls: ['./lecture-type.component.css']
})
export class LectureTypeComponent implements OnInit {

  @ViewChild('description', {static: true}) description: ElementRef;

  lectureType: LectureType;

  constructor(private _service: GeneralService, private _markdown: MarkdownService,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    const lectureId = this._route.snapshot.params.id;
    this._service.lectureTypeById(lectureId)
        .then(lectureType => {
          this.lectureType = lectureType;
          this._markdown.encode(lectureType.description).then(text => {
            (this.description.nativeElement as HTMLElement).innerHTML = text;
          });
        });
  }

}
