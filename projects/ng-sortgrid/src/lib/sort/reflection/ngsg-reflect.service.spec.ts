import {NgsgReflectService} from './ngsg-reflect.service';
import {NgsgDragelement} from '../../shared/ngsg-dragelement.model';
import {NgsgElementsHelper} from '../../helpers/element/ngsg-elements.helper';

describe('NgsgReflectService', () => {
  const ngsgStoreMock = {
    getItems: jest.fn(),
    getSelectedItems: jest.fn(),
    setItems: jest.fn(),
  } as any;
  let sut: NgsgReflectService;

  beforeEach(() => {
    sut = new NgsgReflectService(ngsgStoreMock);
  });

  it('must emit 1,2,4,5,6,3,7,8,9,10 if we drag 3 to position 6', () => {
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 6;
    const selectedItems: NgsgDragelement[] = [{ node: undefined, originalIndex: 2 }];
    const expectedOrder = [1, 2, 4, 5, 6, 7, 3, 8, 9, 10];

    ngsgStoreMock.getItems = () => initialOrder;
    ngsgStoreMock.getSelectedItems = () => selectedItems;
    NgsgElementsHelper.findIndex = () => dropIndex;

    const sortedItems = sut.reflectChanges('', {} as any);
    expect(sortedItems).toEqual(expectedOrder);
  });

  it('must emit 1,4,5,6,2,3,7,8,9,10 if we drag 2 and 3 to position 6', () => {
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 6;
    const selectedItems: NgsgDragelement[] = [
      { node: undefined, originalIndex: 1 },
      { node: undefined, originalIndex: 2 },
    ];
    const expectedOrder = [1, 4, 5, 6, 7, 8, 2, 3, 9, 10];

    ngsgStoreMock.getItems = () => initialOrder;
    ngsgStoreMock.getSelectedItems = () => selectedItems;
    NgsgElementsHelper.findIndex = () => dropIndex;

    const sortedItems = sut.reflectChanges('', {} as any);
    expect(sortedItems).toEqual(expectedOrder);
  });

  it('must emit 1,4,5,6,3,2,7,8,9,10 if we drag 3 and 2 to position 6', () => {
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 6;
    const selectedItems: NgsgDragelement[] = [
      { node: undefined, originalIndex: 2 },
      { node: undefined, originalIndex: 1 },
    ];
    const expectedOrder = [1, 4, 5, 6, 7, 8, 3, 2, 9, 10];

    ngsgStoreMock.getItems = () => initialOrder;
    ngsgStoreMock.getSelectedItems = () => selectedItems;
    NgsgElementsHelper.findIndex = () => dropIndex;

    const sortedItems = sut.reflectChanges('', {} as any);
    expect(sortedItems).toEqual(expectedOrder);
  });

  it('must emit the same order if the dropIndex ins in the selection', () => {
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 1;
    const selectedItems: NgsgDragelement[] = [
      { node: 'some node' as any, originalIndex: 1 },
      { node: 'another node' as any, originalIndex: 2 },
    ];
    const expectedOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    ngsgStoreMock.getItems = () => initialOrder;
    ngsgStoreMock.getSelectedItems = () => selectedItems;
    NgsgElementsHelper.findIndex = () => dropIndex;

    const sortedItems = sut.reflectChanges('', 'some node' as any);
    expect(sortedItems).toEqual(expectedOrder);
  });

  it('must set the new sort order on the store with ther correct group and the items', () => {
    const group = 'exampleGroup';
    const initialOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const dropIndex = 6;
    const selectedItems: NgsgDragelement[] = [{ node: undefined, originalIndex: 2 }];
    const expectedOrder = [1, 2, 4, 5, 6, 7, 3, 8, 9, 10];

    ngsgStoreMock.getItems = () => initialOrder;
    ngsgStoreMock.getSelectedItems = () => selectedItems;
    NgsgElementsHelper.findIndex = () => dropIndex;

    sut.reflectChanges(group, {} as any);
    expect(ngsgStoreMock.setItems).toHaveBeenCalledWith(group, expectedOrder);
  });
});
