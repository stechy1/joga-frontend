import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit, AfterViewChecked {

  private _fragment;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe(fragment => { this._fragment = fragment; });
  }

  ngAfterViewChecked(): void {
    try {
      if (this._fragment) {
        document.querySelector('#' + this._fragment).scrollIntoView({behavior: 'smooth'});
      }
    } catch (e) { }
  }

}
