import { Pipe, PipeTransform } from '@angular/core';
import { CarouselImage } from '../carousel-image';

@Pipe({
  name: 'filterActive',
  pure: false
})
export class FilterActivePipe implements PipeTransform {

  transform(value: CarouselImage[]): CarouselImage[] {
    return value.filter(image => image.isEnabled());
  }

}
