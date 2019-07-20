import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CardComponent} from './card/card.component';
import { TableComponent } from './table/table.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    TableComponent,
    CarouselComponent
  ]
})
export class ShareModule {

}
