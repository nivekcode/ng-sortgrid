import {AfterViewInit, Directive, ElementRef, HostListener, Input, NgZone} from '@angular/core';

@Directive({
  selector: '[ngSortgridItem]'
})
export class NgSortgridItemDirective implements AfterViewInit {

  @Input('ngSortgridItem')
  private ngSortGridItemKey: string;

  constructor(public el: ElementRef, public zone: NgZone) {
  }

  ngAfterViewInit(): void {
    console.log('Key', this.ngSortGridItemKey);
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event): void {
    console.log('Drag start', event);
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event): void {
    console.log('Drag enter', event);
  }

  @HostListener('dragover', ['$event'])
  dragOver(event): boolean {
    if (event.preventDefault) {
      event.preventDefault(); // Necessary. Allows us to drop.
    }
    return false;
  }

  @HostListener('drop', ['$event'])
  drop(event): void {
    console.log('Drop', event);
  }
}
