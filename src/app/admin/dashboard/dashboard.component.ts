import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarouselImageRecord } from '../../share/carousel/carousel-image-record';

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
  private _images = [
    'https://lorempixel.com/800/400/food/1',
    'https://lorempixel.com/800/400/food/2',
    'https://lorempixel.com/800/400/food/3',
    'https://lorempixel.com/800/400/food/4'
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

  get images(): CarouselImageRecord[] {
    return this._images.map(image => {
        return {url: image, visible: false, description: 'Lorem ipsum dolor samet bla bla bla', title: 'Titulek obrázku'};
      });
  }
}
