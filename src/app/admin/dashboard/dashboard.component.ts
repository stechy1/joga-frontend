import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heads = ['prvni', 'druhy', 'treti'];
  rows = [
    ['Praha', 'Plzen', 'Ostrava'],
    ['Mnichov', 'Olomouc', 'Modrava'],
    ['Čechy', 'Morava', 'Slezko']
    ];
  images = [
    // 'https://lorempixel.com/800/400/food/1',
    // 'https://lorempixel.com/800/400/food/2',
    // 'https://lorempixel.com/800/400/food/3',
    // 'https://lorempixel.com/800/400/food/4'
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  handleClick() {
    this.http.get('/api/admin/dashboard/users')
    .toPromise()
    .then(value => {
      console.log(value);
    });
  }
}
