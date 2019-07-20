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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/admin/dashboard/users')
        .toPromise()
        .then(value => {
          console.log(value);
        });
  }

}
