import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone, OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges
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
import {group} from '@angular/animations';

const selector = '[ngSortgridItem]';

@Directive({selector})
export class NgsgItemDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() ngSortGridGroup = 'defaultGroup';
  @Input() ngSortGridItems;

  @Output() sorted = new EventEmitter<any>();

  private selected = false;
  private destroy$ = new Subject();

  constructor(
    public el: ElementRef,
    private sortService: NgsgSortService,
    private selectionService: NgsgSelectionService,
    private reflectService: NgsgReflectService,
    private ngsgStore: NgsgStoreService,
    private ngsgEventService: NgsgEventsService
  ) {
  }

  ngOnInit(): void {
    this.ngsgEventService.dropped$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.selected = false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const sortGridItemChanges = changes.ngSortGridItems;
    const sortGridItems = sortGridItemChanges.currentValue ? sortGridItemChanges.currentValue : [];

    if (!this.ngsgStore.hasGroup(this.ngSortGridGroup)) {
      this.ngsgStore.initState(this.ngSortGridGroup, sortGridItems);
      return;
    }
    this.ngsgStore.setItems(this.ngSortGridGroup, sortGridItems);
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

  @HostListener('dragenter')
  dragEnter(): void {
    if (!this.ngsgStore.hasSelectedItems(this.ngSortGridGroup)) {
      return;
    }
    this.sortService.sort(this.el.nativeElement);
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
  drop(): void {
    if (!this.ngsgStore.hasSelectedItems(this.ngSortGridGroup)) {
      return;
    }

    if (!this.ngsgStore.hasItems(this.ngSortGridGroup)) {
      console.warn(`Ng-sortgrid: No items provided - please use [sortGridItems] to pass in an array of items -
      otherwhise the ordered items can not be emitted in the (sorted) event`);
      return;
    }

    this.sortService.endSort();
    const reflectedChanges = this.reflectService.reflectChanges(this.ngSortGridGroup, this.el.nativeElement);
    this.sorted.next(reflectedChanges);
    this.ngsgStore.resetSelectedItems(this.ngSortGridGroup);
    this.ngsgEventService.dropped$.next();
  }

  @HostListener('click', ['$event'])
  clicked(): void {
    this.selected = !this.selected;
    this.selectionService.updateSelectedDragItem(this.ngSortGridGroup, this.el.nativeElement, this.selected);
  }

  private occuredOnHost(event): boolean {
    return event.target.matches(selector);
  }
}
