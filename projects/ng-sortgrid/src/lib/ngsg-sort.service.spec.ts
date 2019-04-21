import {NgsgSortService} from './ngsg-sort.service';
import createSpyObj = jasmine.createSpyObj;
import {NgsgClassService} from './ngsg-class.service';
import {NgsgStoreService} from './ngsg-store.service';
import {NgsgElementsHelper} from './ngsg-elements.helper';

describe('NgsgSortService', () => {

  let sut: NgsgSortService;
  const selectionService = createSpyObj<NgsgClassService>('classService',
    ['addPlaceHolderClass', 'removePlaceHolderClass', 'addDroppedClass', 'removeSelectedClass']);
  const ngsgStore = createSpyObj<NgsgStoreService>('ngsgStore', ['getFirstSelectItem', 'getSelectedItems']);

  beforeEach(() => {
    sut = new NgsgSortService(selectionService, ngsgStore);
  });

  const createElement = (value, nextSibling) => ({
    value,
    nextSibling,
    parentNode: {
      insertBefore: () => {
      }
    }
  }) as any;

  it('should insert the first element in the middle if we drag it to the right', () => {
    const group = 'test-group';

    const lastElement = createElement(3, null);
    const middleElement = createElement(2, lastElement);
    const firstElement = createElement(1, middleElement);

    const dragElement = {originalIndex: 0, node: firstElement} as any;
    const dropElement = middleElement as any;

    ngsgStore.getFirstSelectItem.and.returnValue({originalIndex: 0});
    ngsgStore.getSelectedItems.and.returnValue([dragElement]);
    const insertBeforeSpy = spyOn(dropElement.parentNode, 'insertBefore');
    NgsgElementsHelper.findIndex = () => 1;

    sut.initSort(group);
    sut.sort(dropElement);

    expect(insertBeforeSpy).toHaveBeenCalledWith(dragElement.node, lastElement);
  });

});
