import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewChecked {

  @Input() headerColor: 'success' | 'warning' | 'danger' = 'success';
  @Input() title: string;
  @Input() subtitle: string;
  @Input() tableHeads: string[];
  @Input() tableRows: string[][];

  @ViewChild('tableContent', {static: true}) tableContent?: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    console.log(this.tableRows);
  }

  get tableHasCustomContent(): boolean {
    // console.log(this.tableContent);
    return this.tableRows === undefined;
    // return this.tableContent ? this.tableContent.nativeElement.children.length !== 0 : false;
  }
}
