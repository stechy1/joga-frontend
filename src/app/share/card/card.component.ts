import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  private static readonly ICONS_BY_HEADER = {
    success : 'check',
    warning : 'warning',
    danger : 'error'
  };

  @Input() cardType: 'stats' | 'chart';
  @Input() headerColor: 'success' | 'warning' | 'danger' = 'success';
  @Input() title: string;
  private _titleIcon: string;
  @Input() subtitle: string;
  @Input() note: string;
  @Input() noteHref: string;
  @Input() noteIcon: string;

  constructor() { }

  ngOnInit() {}

  get cardHeader(): string {
    return `card-header-${this.headerColor ? this.headerColor : 'success'}`;
  }

  @Input() set titleIcon(titleIcon: string) {
    this._titleIcon = titleIcon;
  }

  get titleIcon(): string {
    if (this._titleIcon) {
      return this._titleIcon;
    }

    if (CardComponent.ICONS_BY_HEADER[this.headerColor]) {
      return CardComponent.ICONS_BY_HEADER[this.headerColor];
    }

    return '';
  }
}
