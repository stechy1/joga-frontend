import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialog-childs]'
})
export class DialogChildsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
