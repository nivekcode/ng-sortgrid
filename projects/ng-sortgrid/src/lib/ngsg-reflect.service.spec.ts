import createSpyObj = jasmine.createSpyObj;

import {NgsgStoreService} from './ngsg-store.service';
import {NgsgReflectService} from './ngsg-reflect.service';
import {NgsgDragelement} from './ngsg-dragelement.model';
import {NgsgElementsHelper} from './ngsg-elements.helper';

describe('NgsgReflectService', () => {

  const ngsgStoreMock = createSpyObj<NgsgStoreService>('ngsgStore', ['getItems', 'getSelectedItems', 'setItems']);
  let sut: NgsgReflectService;

  beforeEach(() => {
    sut = new NgsgReflectService(ngsgStoreMock);
  });

  it('must emit 1,2,4,5,6,3,7,8,9,10 if we drag 3 to position 6', () => {
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 6;
    const selectedItems: NgsgDragelement[] = [{node: undefined, originalIndex: 2}];
    const expectedOrder = [1, 2, 4, 5, 6, 7, 3, 8, 9, 10];

    ngsgStoreMock.getItems.and.returnValue(initialOrder);
    ngsgStoreMock.getSelectedItems.and.returnValue(selectedItems);
    NgsgElementsHelper.findIndex = () => dropIndex;

    const sortedItems = sut.reflectChanges('', {} as any);
    expect(sortedItems).toEqual(expectedOrder);
  });

  it('must emit 1,4,5,6,2,3,7,8,9,10 if we drag 2 and 3 to position 6', () => {
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 6;
    const selectedItems: NgsgDragelement[] = [{node: undefined, originalIndex: 1}, {node: undefined, originalIndex: 2}];
    const expectedOrder = [1, 4, 5, 6, 7, 8, 2, 3, 9, 10];

    ngsgStoreMock.getItems.and.returnValue(initialOrder);
    ngsgStoreMock.getSelectedItems.and.returnValue(selectedItems);
    NgsgElementsHelper.findIndex = () => dropIndex;

    const sortedItems = sut.reflectChanges('', {} as any);
    expect(sortedItems).toEqual(expectedOrder);
  });

  it('must emit 1,4,5,6,3,2,7,8,9,10 if we drag 3 and 2 to position 6', () => {
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 6;
    const selectedItems: NgsgDragelement[] = [{node: undefined, originalIndex: 2}, {node: undefined, originalIndex: 1}];
    const expectedOrder = [1, 4, 5, 6, 7, 8, 3, 2, 9, 10];

    ngsgStoreMock.getItems.and.returnValue(initialOrder);
    ngsgStoreMock.getSelectedItems.and.returnValue(selectedItems);
    NgsgElementsHelper.findIndex = () => dropIndex;

    const sortedItems = sut.reflectChanges('', {} as any);
    expect(sortedItems).toEqual(expectedOrder);
  });

  it('must emit the same order if the dropIndex ins in the selection', () => {
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 1;
    const selectedItems: NgsgDragelement[] = [
      {node: 'some node' as any, originalIndex: 1},
      {node: 'another node' as any, originalIndex: 2}
    ];
    const expectedOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    ngsgStoreMock.getItems.and.returnValue(initialOrder);
    ngsgStoreMock.getSelectedItems.and.returnValue(selectedItems);
    NgsgElementsHelper.findIndex = () => dropIndex;

    const sortedItems = sut.reflectChanges('', 'some node' as any);
    expect(sortedItems).toEqual(expectedOrder);
  });

  it('must set the new sort order on the store with ther correct group and the items', () => {
    const group = 'exampleGroup';
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 6;
    const selectedItems: NgsgDragelement[] = [{node: undefined, originalIndex: 2}];
    const expectedOrder = [1, 2, 4, 5, 6, 7, 3, 8, 9, 10];

    ngsgStoreMock.getItems.and.returnValue(initialOrder);
    ngsgStoreMock.getSelectedItems.and.returnValue(selectedItems);
    NgsgElementsHelper.findIndex = () => dropIndex;

    sut.reflectChanges(group, {} as any);
    expect(ngsgStoreMock.setItems).toHaveBeenCalledWith(group, expectedOrder);
  });

});
