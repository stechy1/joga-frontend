import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-max-value',
  templateUrl: './current-max-value.component.html',
  styleUrls: ['./current-max-value.component.css']
})
export class CurrentMaxValueComponent implements OnInit {

  @Input() currentValue: number;
  @Input() maxValue: number;
  @Input() lowerDelta: number;
  @Input() higherDelta: number;

  constructor() { }

  ngOnInit() {
  }

  get isLowerBorder(): boolean {
    return this.currentValue <= this.lowerDelta;
  }

  get isHigherBorder(): boolean {
    return this.currentValue >= this.higherDelta;
  }

}
