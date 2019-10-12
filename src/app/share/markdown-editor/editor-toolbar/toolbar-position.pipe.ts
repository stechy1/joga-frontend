import { Pipe, PipeTransform } from '@angular/core';
import { ToolbarButton } from './toolbar-button';

@Pipe({
  name: 'toolbarPosition'
})
export class ToolbarPositionPipe implements PipeTransform {

  transform(buttons: ToolbarButton[], position: string): any {
    return buttons.filter(button => {
      return button.position === position;
    });
  }

}
