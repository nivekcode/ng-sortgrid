import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[ngSortgridDragHandle]',
    standalone: false
})
export class NgsgDragHandleDirective {

  constructor(public el: ElementRef){}
}
