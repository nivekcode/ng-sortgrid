import {AfterViewInit, Directive, ElementRef, HostListener, Input, NgZone, OnInit} from '@angular/core';
import {SortService} from './sort.service';
import {SelectionService} from './selection.service';
import {timer} from 'rxjs';
import {ClassService} from './class.service';

@Directive({
  selector: '[ngSortgridItem]'
})
export class NgSortgridItemDirective implements OnInit, AfterViewInit {

  @Input('ngSortgridItem')
  private ngSortGridItemKey: string;
  private selected: boolean;

  private internalSortGridItems: any[];

  @Input('sortGridItems') set sortGridItems(sortGridItems: any[]) {
    // How does it behave with async values?
    this.internalSortGridItems = [...sortGridItems];
  }

  constructor(public el: ElementRef, public zone: NgZone,
              private sortService: SortService, private selectionService: SelectionService,
              private classService: ClassService) {
  }

  ngOnInit(): void {
    this.selected = false;
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event): void {
    this.sortService.initSort(event.target);
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
  drop(): void {
    const element = event.target as Element;
    this.sortService.endSort(element);
  }

  @HostListener('click', ['$event'])
  clicked(event): void {
    const element = event.target;
    this.selected = !this.selected;
    this.selectionService.updateSelectedDragItem(element, this.selected);
  }
}
