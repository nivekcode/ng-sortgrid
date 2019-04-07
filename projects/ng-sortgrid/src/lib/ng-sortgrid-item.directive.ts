import {AfterViewInit, Directive, ElementRef, HostListener, Input, NgZone} from '@angular/core';
import {SortService} from './sort.service';

@Directive({
  selector: '[ngSortgridItem]'
})
export class NgSortgridItemDirective implements AfterViewInit {

  @Input('ngSortgridItem')
  private ngSortGridItemKey: string;

  constructor(public el: ElementRef, public zone: NgZone, private sortService: SortService) {
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event): void {
    this.sortService.startDrag(event.target);
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event): void {
    this.sortService.sort(event.target);
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
