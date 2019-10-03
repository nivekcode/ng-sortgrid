import {NgsgItemDirective} from './ngsg-item.directive';

import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
import {NgsgSortService} from './sort/sort/ngsg-sort.service';
import {NgsgSelectionService} from './mutliselect/ngsg-selection.service';
import {NgsgReflectService} from './sort/reflection/ngsg-reflect.service';
import {NgsgStoreService} from './store/ngsg-store.service';
import {NgsgEventsService} from './shared/ngsg-events.service';

describe('NgsgItemDirective', () => {
  let sut: NgsgItemDirective;

  const elementRef = {nativeElement: {}};
  const ngsgSortService = createSpyObj<NgsgSortService>('ngsgSortService', ['initSort', 'sort', 'endSort']);
  const ngsgSelectionService = createSpyObj<NgsgSelectionService>('ngsgSelectionService', [
    'selectElementIfNoSelection',
    'updateSelectedDragItem'
  ]);
  const ngsgReflectService = createSpyObj<NgsgReflectService>('ngsgReflectService', ['reflectChanges']);
  const ngsgStore = createSpyObj<NgsgStoreService>('ngsgStore', [
    'initState',
    'hasSelectedItems',
    'resetSelectedItems',
    'hasGroup',
    'hasItems',
    'setItems'
  ]);
  const ngsgEventService = new NgsgEventsService();
  const scrollHelperService = {
    scrollIfNecessary: () => {
    }
  } as any;

  beforeEach(() => {
    sut = new NgsgItemDirective(
      elementRef,
      ngsgSortService,
      ngsgSelectionService,
      ngsgReflectService,
      ngsgStore,
      ngsgEventService,
      scrollHelperService
    );
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

  it('should call sort with the host if the event occured on the host', () => {
    ngsgStore.hasSelectedItems.and.returnValue(true);

    sut.dragEnter();
    expect(ngsgSortService.sort).toHaveBeenCalledWith(elementRef.nativeElement);
  });

  it('should sort the items if the event occured on the host and on the correct group', () => {
    ngsgStore.hasSelectedItems.and.returnValue(true);
    sut.dragEnter();
    expect(ngsgSortService.sort).toHaveBeenCalledWith(elementRef.nativeElement);
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
    sut.drop();
    expect(ngsgSortService.endSort).not.toHaveBeenCalled();
  });

  it('should sort if the group contains selectedItems', () => {
    ngsgStore.hasSelectedItems.and.returnValue(true);
    ngsgStore.hasItems.and.returnValue(true);
    sut.drop();
    expect(ngsgSortService.endSort).toHaveBeenCalled();
  });

  it('should call the reflection service with the host if the event occured on it', () => {
    const group = 'test-group';
    sut.ngSortGridGroup = group;
    ngsgStore.hasSelectedItems.and.returnValue(true);

    sut.drop();
    expect(ngsgReflectService.reflectChanges).toHaveBeenCalledWith(group, elementRef.nativeElement);
  });

  it('should get the reflected changes from the reflection service and emit them', done => {
    const group = 'test-group';
    const reflectedChanges = ['item two', 'item one', 'item three'];

    ngsgStore.hasSelectedItems.and.returnValue(true);
    ngsgStore.hasItems.and.returnValue(true);
    ngsgReflectService.reflectChanges.and.returnValue(reflectedChanges);
    sut.ngSortGridGroup = group;

    sut.sorted.subscribe(changes => {
      expect(reflectedChanges).toEqual(changes);
      done();
    });
    sut.drop();
    expect(ngsgReflectService.reflectChanges).toHaveBeenCalledWith(group, elementRef.nativeElement);
  });

  it('should reset the selected items on drop', () => {
    sut.drop();
    expect(ngsgStore.resetSelectedItems).toHaveBeenCalled();
  });

  it('should stream the dropped event on the eventservice', done => {
    ngsgEventService.dropped$.subscribe(() => done());
    sut.drop();
  });

  it('should call the selctionservice with the host if the event occured on the host', () => {
    const group = 'test-group';
    sut.ngSortGridGroup = group;

    sut.clicked();
    expect(ngsgSelectionService.updateSelectedDragItem).toHaveBeenCalledWith(group, elementRef.nativeElement, true);
  });

  it(`should init the state with empty items if group has yet not been
  initialized and the currentValue is null`, () => {
    const group = 'test-group';
    const changes = {
      ngSortGridItems: {
        currentValue: null
      }
    } as any;
    sut.ngSortGridGroup = group;
    ngsgStore.hasGroup.and.returnValue(false);

    sut.ngOnChanges(changes);
    expect(ngsgStore.initState).toHaveBeenCalledWith(group, []);
  });

  it('should init the state with items from the currentValue if group has yet not been initialized', () => {
    const group = 'test-group';
    const changes = {
      ngSortGridItems: {
        currentValue: null
      }
    } as any;
    sut.ngSortGridGroup = group;
    ngsgStore.hasGroup.and.returnValue(false);

    sut.ngOnChanges(changes);
    expect(ngsgStore.initState).toHaveBeenCalledWith(group, []);
  });

  it('should set the items if the group has allready been initialized', () => {
    const group = 'test-group';
    const items = ['Item one', 'item two'];
    const changes = {
      ngSortGridItems: {
        currentValue: items
      }
    } as any;
    sut.ngSortGridGroup = group;
    ngsgStore.hasGroup.and.returnValue(true);

    sut.ngOnChanges(changes);
    expect(ngsgStore.setItems).toHaveBeenCalledWith(group, items);
  });

  it('should log a warning message if you drop and you did not provide any items', () => {
    const expectedWarniningMessage =
      `Ng-sortgrid: No items provided - please use [sortGridItems] to pass in an array of items -
      otherwhise the ordered items can not be emitted in the (sorted) event`;
    const consoleWarnSpy = spyOn(console, 'warn');
    ngsgStore.hasItems.and.returnValue(false);

    sut.drop();
    expect(consoleWarnSpy).toHaveBeenCalledWith(expectedWarniningMessage);
  });

  describe('Drag', () => {

    it('should not call the scrollHelper if autoScroll is set to false', () => {
      spyOn(scrollHelperService, 'scrollIfNecessary');
      sut.drag({});
      expect(scrollHelperService.scrollIfNecessary).not.toHaveBeenCalled();
    });

    it('should call the scrollHelper with the event, the scrollpoints and the scrollspeed', () => {
      spyOn(scrollHelperService, 'scrollIfNecessary');
      const event = 'A very cool event';
      const scrollPointTop = 10;
      const scrollPointBottom = 80;
      const scrollSpeed = 100;

      sut.scrollPointTop = scrollPointTop;
      sut.scrollPointBottom = scrollPointBottom;
      sut.scrollSpeed = scrollSpeed;
      sut.autoScroll = true;

      sut.drag(event);
      expect(scrollHelperService.scrollIfNecessary).toHaveBeenCalledWith(event, {
        top: scrollPointTop,
        bottom: scrollPointBottom
      }, scrollSpeed);
    });

  });
});
