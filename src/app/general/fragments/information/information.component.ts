import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MarkdownService } from '../../../share/markdown-editor/markdown.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  private static readonly URL_ABOUT_ME = '/public/uploads/info/my.txt';
  private static readonly URL_ABOUT_STUDIO = '/public/uploads/info/studio.txt';

  aboutMe = '';
  aboutStudio = '';

  constructor(private _markdown: MarkdownService, private _http: HttpClient) {
  }

  ngOnInit() {
    this._http.get(InformationComponent.URL_ABOUT_ME, {responseType: 'text'})
        .toPromise()
        .then(value => {
          this._markdown.encode(value).then(text => {
            this.aboutMe = text;
          });
        });
    this._http.get(InformationComponent.URL_ABOUT_STUDIO, {responseType: 'text'})
        .toPromise()
        .then(value => {
          this._markdown.encode(value).then(text => {
            this.aboutStudio = text;
          });
        });
  }

}
