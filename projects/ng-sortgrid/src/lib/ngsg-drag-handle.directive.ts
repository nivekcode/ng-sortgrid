import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngSortgridDragHandle]'
})
export class NgsgDragHandleDirective {

  constructor(public el: ElementRef){}
}
