import {NgsgItemDirective} from './ngsg-item.directive';
import createSpyObj = jasmine.createSpyObj;

import {NgsgSortService} from './ngsg-sort.service';
import {NgsgSelectionService} from './ngsg-selection.service';
import {NgsgReflectService} from './ngsg-reflect.service';
import {NgsgStoreService} from './ngsg-store.service';
import {NgsgEventsService} from './ngsg-events.service';
import createSpy = jasmine.createSpy;
import {NgsgElementsHelper} from './ngsg-elements.helper';

describe('NgsgItemDirective', () => {

  let sut: NgsgItemDirective;

  const elementRef = {nativeElement: {}};
  const ngsgSortService = createSpyObj<NgsgSortService>('ngsgSortService', ['initSort', 'sort', 'endSort']);
  const ngsgSelectionService = createSpyObj<NgsgSelectionService>('ngsgSelectionService',
    ['selectElementIfNoSelection', 'updateSelectedDragItem']);
  const ngsgReflectService = createSpyObj<NgsgReflectService>('ngsgReflectService', ['reflectChanges']);
  const ngsgStore = createSpyObj<NgsgStoreService>('ngsgStore',
    ['initState', 'hasSelectedItems', 'resetSelectedItems']);
  const ngsgEventService = new NgsgEventsService();

  beforeEach(() => {
    sut = new NgsgItemDirective(elementRef, ngsgSortService, ngsgSelectionService,
      ngsgReflectService, ngsgStore, ngsgEventService);
  });

  it('should log a warning if we do not pass in sort grid items', () => {
    const consoleWarnSpy = spyOn(global.console, 'warn');
    sut.ngOnInit();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `Ng-sortgrid: No items provided - please use [sortGridItems] to pass in an array of items -
      otherwhise the ordered items will not be emitted in the (sorted) event`);
  });

  it('should init the store with the sortGridGroup, the ngSortGridItems and the classes', () => {
    const sortGridGroup = 'sortgridgroup';
    const sortGridItems = ['item one', 'item two', 'item three'] as any;
    sut.ngSortGridItems = sortGridItems;
    sut.ngSortGridGroup = sortGridGroup;

    sut.ngOnInit();
    expect(ngsgStore.initState).toHaveBeenCalledWith(sortGridGroup, sortGridItems, {});
  });

  it('should set the draggable attribute on the elment', () => {
    sut.ngAfterViewInit();
    expect((elementRef.nativeElement as any).draggable).toBeTruthy();
  });

  it('should not set selectedElements if the event did not occur on the host', () => {
    const event = {
      target: {
        matches: () => false
      }
    };
    sut.dragStart(event);
    expect(ngsgSelectionService.selectElementIfNoSelection).not.toHaveBeenCalled();
  });

  it('should call selectionService selectElementIfNoSelection if the event occured on the host', () => {
    const sortGroup = 'test-group';
    sut.ngSortGridGroup = sortGroup;
    const event = {
      target: {
        matches: () => true
      }
    };
    sut.dragStart(event);
    expect(ngsgSelectionService.selectElementIfNoSelection).toHaveBeenCalledWith(sortGroup, event.target);
  });

  it('should init the sort for the current group', () => {
    const sortGroup = 'test-group';
    sut.ngSortGridGroup = sortGroup;
    const event = {
      target: {
        matches: () => true
      }
    };
    sut.dragStart(event);
    expect(ngsgSortService.initSort).toHaveBeenCalledWith(sortGroup);
  });

  it('should not sort the items if the event did not occured in the group', () => {
    ngsgStore.hasSelectedItems.and.returnValue(false);
    const event = {};
    sut.dragEnter(event);
    expect(ngsgSortService.sort).not.toHaveBeenCalled();
  });

  it('should not sort the items if the event did not occured on the host', () => {
    ngsgStore.hasSelectedItems.and.returnValue(false);
    const event = {
      target: {
        matches: () => false
      }
    };
    sut.dragEnter(event);
    expect(ngsgSortService.sort).not.toHaveBeenCalled();
  });

  it('should sort the items if the event occured on the host and on the correct group', () => {
    ngsgStore.hasSelectedItems.and.returnValue(true);
    const event = {
      target: {
        matches: () => true
      }
    };
    sut.dragEnter(event);
    expect(ngsgSortService.sort).toHaveBeenCalledWith(event.target);
  });

  it('must call event preventDefault', () => {
    const preventDefaultSpy = createSpy();
    const event = {preventDefault: preventDefaultSpy};
    sut.dragOver(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('must return false on dragOver', () => {
    const actual = sut.dragOver({});
    expect(actual).toBeFalsy();
  });

  it('should not call endSort if the group does not contain selectedItems', () => {
    ngsgStore.hasSelectedItems.and.returnValue(false);
    sut.drop({});
    expect(ngsgSortService.endSort).not.toHaveBeenCalled();
  });

  it('should sort if the group contains selectedItems', () => {
    ngsgStore.hasSelectedItems.and.returnValue(true);
    sut.drop({});
    expect(ngsgSortService.endSort).toHaveBeenCalled();
  });

  it('should get the reflected changes from the reflection service and emit them', done => {
    const group = 'test-group';
    const event = {target: 'some target'};
    const reflectedChanges = ['item two', 'item one', 'item three'];

    ngsgStore.hasSelectedItems.and.returnValue(true);
    ngsgReflectService.reflectChanges.and.returnValue(reflectedChanges);
    sut.ngSortGridGroup = group;

    sut.sorted.subscribe(changes => {
      expect(reflectedChanges).toEqual(changes);
      done();
    });
    sut.drop(event);
    expect(ngsgReflectService.reflectChanges).toHaveBeenCalledWith(group, event.target);
  });

  it('should reset the selected items on drop', () => {
    const event = {target: 'some target'};
    sut.drop(event);
    expect(ngsgStore.resetSelectedItems).toHaveBeenCalled();
  });

  it('should stream the dropped event on the eventservice', done => {
    const event = {target: 'some target'};
    ngsgEventService.dropped$.subscribe(() => done());
    sut.drop(event);
  });

  it('should call the selctionservice with the host if the event occured on the host', () => {
    const group = 'test-group';
    const event = {target: {matches: () => true}};
    sut.ngSortGridGroup = group;

    sut.clicked(event);
    expect(ngsgSelectionService.updateSelectedDragItem).toHaveBeenCalledWith(group, event.target, true);
  });

  it('should call the selctionservice with the host, even if the event did not occure on it', () => {
    const group = 'test-group';
    const event = {target: {matches: () => false}};
    const host = 'Some element' as any;
    NgsgElementsHelper.findHost = () => host;
    sut.ngSortGridGroup = group;

    sut.clicked(event);
    expect(ngsgSelectionService.updateSelectedDragItem).toHaveBeenCalledWith(group, host, true);
  });

});
