import {NgsgSortService} from './ngsg-sort.service';
import createSpyObj = jasmine.createSpyObj;
import {NgsgClassService} from './ngsg-class.service';
import {NgsgStoreService} from './ngsg-store.service';
import {NgsgElementsHelper} from './ngsg-elements.helper';

describe('NgsgSortService', () => {

  let sut: NgsgSortService;
  const classService = createSpyObj<NgsgClassService>('classService',
    ['addPlaceHolderClass', 'removePlaceHolderClass', 'addDroppedClass', 'removeSelectedClass', 'removeDroppedClass']);
  const ngsgStore = createSpyObj<NgsgStoreService>('ngsgStore', ['getFirstSelectItem', 'getSelectedItems']);

  beforeEach(() => {
    sut = new NgsgSortService(classService, ngsgStore);
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

  it('should insert the last element in the middle if we drag it to the left', () => {
    const group = 'test-group';

    const lastElement = createElement(3, null);
    const middleElement = createElement(2, lastElement);
    const dragElement = {originalIndex: 2, node: lastElement} as any;
    const dropElement = middleElement as any;

    ngsgStore.getFirstSelectItem.and.returnValue({originalIndex: 2});
    ngsgStore.getSelectedItems.and.returnValue([dragElement]);
    const insertBeforeSpy = spyOn(dropElement.parentNode, 'insertBefore');
    NgsgElementsHelper.findIndex = () => 1;

    sut.initSort(group);
    sut.sort(dropElement);

    expect(insertBeforeSpy).toHaveBeenCalledWith(dragElement.node, middleElement);
  });

  it('should remove the placeholder class on all selected elements if the sort ends', () => {
    const group = 'test-group';
    const selectedItems = [{node: 'ItemOne'}, {node: 'ItemTwo'}];
    ngsgStore.getSelectedItems.and.returnValue(selectedItems);

    sut.initSort(group);
    sut.endSort();

    expect(classService.removePlaceHolderClass).toHaveBeenCalledWith(selectedItems[0].node);
    expect(classService.removePlaceHolderClass).toHaveBeenCalledWith(selectedItems[1].node);
  });

  it('should add the dropped class on all selected elements if the sort ends', () => {
    const group = 'test-group';
    const selectedItems = [{node: 'ItemOne'}, {node: 'ItemTwo'}];
    ngsgStore.getSelectedItems.and.returnValue(selectedItems);

    sut.initSort(group);
    sut.endSort();

    expect(classService.addDroppedClass).toHaveBeenCalledWith(selectedItems[0].node);
    expect(classService.addDroppedClass).toHaveBeenCalledWith(selectedItems[1].node);
  });

  it('should remove the selected class on all selected elements if the sort ends', () => {
    const group = 'test-group';
    const selectedItems = [{node: 'ItemOne'}, {node: 'ItemTwo'}];
    ngsgStore.getSelectedItems.and.returnValue(selectedItems);

    sut.initSort(group);
    sut.endSort();

    expect(classService.removeSelectedClass).toHaveBeenCalledWith(selectedItems[0].node);
    expect(classService.removeSelectedClass).toHaveBeenCalledWith(selectedItems[1].node);
  });

});
