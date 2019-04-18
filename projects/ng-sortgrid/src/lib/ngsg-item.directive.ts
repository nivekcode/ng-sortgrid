import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Output
} from '@angular/core';

import {NgsgReflectService} from './ngsg-reflect.service';
import {NgsgStoreService} from './ngsg-store.service';
import {NgsgSortService} from './ngsg-sort.service';
import {NgsgSelectionService} from './ngsg-selection.service';
import {NgsgClassService} from './ngsg-class.service';
import {NgsgElementsHelper} from './ngsg-elements.helper';

const selector = '[ngSortgridItem]';

@Directive({selector})
export class NgsgItemDirective implements OnInit, AfterViewInit {
  private DEFAULT_GROUP = 'defaultGroup';

  @Input()
  private ngSortGridGroup: string = this.DEFAULT_GROUP;
  private selected = false;

  @Input() ngSortGridItems;

  @Output() sorted = new EventEmitter<any>();

  constructor(
    public el: ElementRef,
    private sortService: NgsgSortService,
    private selectionService: NgsgSelectionService,
    private reflectService: NgsgReflectService,
    private classService: NgsgClassService,
    private ngsgStore: NgsgStoreService
  ) {
  }

  ngOnInit(): void {
    // TODO handle classes as input
    if (!this.ngSortGridItems) {
      console.error(`Ng-sortgrid: No items provided - please use [sortGridItems] to pass in an array of items -
      otherwhise the ordered items will not be emitted in the (sorted) event`);
    }
    this.ngsgStore.initState(this.ngSortGridGroup, this.ngSortGridItems, {});
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event): void {
    if (!this.occuredOnHost(event)) {
      return;
    }
    this.selectionService.selectElementIfNoSelection(this.ngSortGridGroup, event.target);
    this.sortService.initSort(this.ngSortGridGroup);
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event): void {
    if (!this.ngsgStore.hasSelectedItems(this.ngSortGridGroup) || !this.occuredOnHost(event)) {
      return;
    }
    this.sortService.sort(event.target);
  }

  @HostListener('dragover', ['$event'])
  dragOver(event): boolean {
    if (event.preventDefault) {
      // Necessary. Allows us to drop.
      event.preventDefault();
    }
    return false;
  }

  @HostListener('drop', ['$event'])
  drop(event): void {
    if (!this.ngsgStore.hasSelectedItems(this.ngSortGridGroup)) {
      return;
    }
    this.sortService.endSort();
    const reflectedChanges = this.reflectService.reflectChanges(this.ngSortGridGroup, event.target);
    this.sorted.next(reflectedChanges);
    this.ngsgStore.resetSelectedItems(this.ngSortGridGroup);
  }

  @HostListener('click', ['$event'])
  clicked(event): void {
    const element = !this.occuredOnHost(event) ? NgsgElementsHelper.findHost(event.target, selector) : event.target;
    this.selected = !this.selected;
    this.selectionService.updateSelectedDragItem(this.ngSortGridGroup, element, this.selected);
  }

  private occuredOnHost(event): boolean {
    return event.target.matches(selector);
  }
}
