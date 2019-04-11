import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Output} from '@angular/core';
import {SortService} from './sort.service';
import {SelectionService} from './selection.service';
import {timer} from 'rxjs';
import {ClassService} from './class.service';
import {NgsgReflectService} from './ngsg-reflect.service';
import {NgsgStoreService} from './ngsg-store.service';

@Directive({
  selector: '[ngSortgridItem]'
})
export class NgSortgridItemDirective implements OnInit, AfterViewInit {

  private DEFAULT_GROUP = 'defaultGroup';

  @Input()
  private ngSortGridGroup: string = this.DEFAULT_GROUP;
  private selected: boolean;

  @Input() ngSortGridItems;

  @Output() sorted = new EventEmitter<any>();

  constructor(public el: ElementRef, public zone: NgZone,
              private sortService: SortService, private selectionService: SelectionService,
              private reflectService: NgsgReflectService<any>,
              private classService: ClassService,
              private ngsgStore: NgsgStoreService) {
  }

  ngOnInit(): void {
    this.ngsgStore.initState(this.ngSortGridGroup, this.ngSortGridItems, {});
    this.selected = false;
    if (!this.ngSortGridItems) {
      console.error('Ng-sortgrid: No items provided - please use [sortGridItems] to pass in an array of items');
    }
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event): void {
    this.selectionService.selectDragItem(this.ngSortGridGroup, event.target);
    this.sortService.initSort(this.ngSortGridGroup);
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event): void {
    // TODO think about adding a custom prop
    console.log('Group', this.ngSortGridGroup);

    const prop = 'ngsortgridgroup';
    const elementGroup = this.ngsgStore.getSelecteditems(this.ngSortGridGroup);
    if (elementGroup.length === 0) {
      return;
    }
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
    const elementGroup = this.ngsgStore.getSelecteditems(this.ngSortGridGroup);
    if (elementGroup.length === 0) {
      return;
    }
    const element = event.target as Element;
    this.sortService.endSort(element);
    const reflectedChanges = this.reflectService.reflectChanges(this.ngSortGridGroup, element);
    this.sorted.next(reflectedChanges);
    this.ngsgStore.resetSelectedItems(this.ngSortGridGroup);
  }

  @HostListener('click', ['$event'])
  clicked(event): void {
    const element = event.target;
    this.selected = !this.selected;
    this.selectionService.updateSelectedDragItem(this.ngSortGridGroup, element, this.selected);
  }
}
