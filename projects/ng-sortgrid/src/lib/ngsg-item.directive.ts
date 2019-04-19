import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone, OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import {NgsgReflectService} from './ngsg-reflect.service';
import {NgsgStoreService} from './ngsg-store.service';
import {NgsgSortService} from './ngsg-sort.service';
import {NgsgSelectionService} from './ngsg-selection.service';
import {NgsgClassService} from './ngsg-class.service';
import {NgsgElementsHelper} from './ngsg-elements.helper';
import {NgsgEventsService} from './ngsg-events.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

const selector = '[ngSortgridItem]';

@Directive({selector})
export class NgsgItemDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() private ngSortGridGroup = 'defaultGroup';
  @Input() ngSortGridItems;

  @Output() sorted = new EventEmitter<any>();

  private selected = false;
  private destroy$ = new Subject();

  constructor(
    public el: ElementRef,
    private sortService: NgsgSortService,
    private selectionService: NgsgSelectionService,
    private reflectService: NgsgReflectService,
    private classService: NgsgClassService,
    private ngsgStore: NgsgStoreService,
    private ngsgEventService: NgsgEventsService
  ) {
  }

  ngOnInit(): void {
    if (!this.ngSortGridItems) {
      console.error(`Ng-sortgrid: No items provided - please use [sortGridItems] to pass in an array of items -
      otherwhise the ordered items will not be emitted in the (sorted) event`);
    }
    this.ngsgStore.initState(this.ngSortGridGroup, this.ngSortGridItems, {});
    this.ngsgEventService.dropped$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.selected = false);
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.draggable = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.ngsgEventService.dropped$.next();
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
