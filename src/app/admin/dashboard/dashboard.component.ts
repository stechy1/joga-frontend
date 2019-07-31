import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarouselImageRecord } from '../../share/carousel/carousel-image-record';

@Component({
  selector: 'app-admin-dashboard',
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
    // 'https://s9.limitedrun.com/images/1101066/8BP079_front_1400x1400.jpg',
    // 'https://www.newton.ac.uk/files/covers/968361.jpg',
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

  get images(): CarouselImageRecord[] {
    return this._images.map(image => {
        return {url: image, visible: false, description: 'Lorem ipsum dolor samet bla bla bla', title: 'Titulek obrázku'};
      });
  }
}
