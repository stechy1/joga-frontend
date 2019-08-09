import { Pipe, PipeTransform } from '@angular/core';
import { CarouselImage } from '../carousel-image';

@Pipe({
  name: 'filterActive',
  pure: false
})
export class FilterActivePipe implements PipeTransform {

  transform(value: CarouselImage[]): CarouselImage[] {
    return value.filter(image => image.isEnabled())
                .sort((a, b) => {
                  const leftOrder = a.getView_order();
                  const rightOrder = b.getView_order();

                  return -(rightOrder - leftOrder);
    });
  }

}
