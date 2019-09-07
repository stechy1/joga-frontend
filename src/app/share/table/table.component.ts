import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() headerColor: 'success' | 'warning' | 'danger' = 'success';
  @Input() title: string;
  @Input() subtitle: string;
  @Input() tableHeads: string[];
  @Input() tableRows: string[][];

  @ViewChild('tableContent', {static: true}) tableContent?: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
  }

  get tableHasCustomContent(): boolean {
    return this.tableRows === undefined;
  }
}
