import { Component, OnInit } from '@angular/core';
import { MyService } from './my.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  aboutMe: string;
  aboutStudio: string;

  constructor(private _myService: MyService) { }

  ngOnInit() {
    this._myService.download().then(value => {
      this.aboutMe = value.my;
      this.aboutStudio = value.studio;
    });
  }

  handleSave(what: string) {
    this._myService.save(what, what === 'my' ? this.aboutMe : this.aboutStudio).catch(reason => console.log(reason));
  }

  handlePublish(what: string) {
    this._myService.publish(what).catch(reason => console.log(reason));
  }
}
