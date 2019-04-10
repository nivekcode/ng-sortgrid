import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Output} from '@angular/core';
import {SortService} from './sort.service';
import {SelectionService} from './selection.service';
import {timer} from 'rxjs';
import {ClassService} from './class.service';
import {NgsgReflectService} from './ngsg-reflect.service';

@Directive({
  selector: '[ngSortgridItem]'
})
export class NgSortgridItemDirective implements OnInit, AfterViewInit {

  @Input('ngSortgridItem')
  private ngSortGridItemKey: string;
  private selected: boolean;

  @Input() ngSortGridItems;

  @Output() sorted = new EventEmitter<any>();

  constructor(public el: ElementRef, public zone: NgZone,
              private sortService: SortService, private selectionService: SelectionService,
              private reflectService: NgsgReflectService,
              private classService: ClassService) {
  }

  ngOnInit(): void {
    this.selected = false;
    if (!this.ngSortGridItems) {
      console.error('Ng-sortgrid: No items provided - please use [sortGridItems] to pass in an array of items');
    } else {
      this.reflectService.initItems(this.ngSortGridItems);
    }
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event): void {
    this.selectionService.selectDragItem(event.target);
    this.sortService.initSort();
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
    const reflectedChanges = this.reflectService.reflectChanges(element);
    this.sorted.next(reflectedChanges);
    this.selectionService.resetSelectedElements();
  }

  @HostListener('click', ['$event'])
  clicked(event): void {
    const element = event.target;
    this.selected = !this.selected;
    this.selectionService.updateSelectedDragItem(element, this.selected);
  }
}
