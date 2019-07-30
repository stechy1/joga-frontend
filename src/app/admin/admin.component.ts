import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  hideSidebar: boolean;

  constructor() { }

  ngOnInit() {
    this.hideSidebar = false;
  }

}
