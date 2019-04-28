import {NgsgStoreService} from './ngsg-store.service';
import {NgsgDragelement} from './ngsg-dragelement.model';

describe('NgsgStoreService', () => {

  let sut: NgsgStoreService;

  beforeEach(() => {
    sut = new NgsgStoreService();
  });

  describe('InitState', () => {

    it('should add the items to the group', () => {
      const group = 'testgroup';
      const items = ['Item1', 'Item2'];
      const classes = [];

      sut.initState(group, items, classes);
      expect(sut.getItems(group)).toEqual(items);
    });

    it('should add empty items to the group if we do not pass items in', () => {
      const group = 'testgroup';
      const items = undefined;
      const classes = [];

      sut.initState(group, items, classes);
      expect(sut.getItems(group)).toEqual([]);
    });

    it('should return false if the group does not contain items', () => {
      const group = 'testgroup';
      sut.initState(group);

      const hasItems = sut.hasItems(group);
      expect(hasItems).toBeFalsy();
    });

    it('should return true if the group contains items', () => {
      const group = 'testgroup';
      sut.initState(group, ['item one', 'item two']);

      const hasItems = sut.hasItems(group);
      expect(hasItems).toBeTruthy();
    });

    it('should return false if the current group has yet not been initialized', () => {
      const group = 'testgroup';

      const hasGroup = sut.hasGroup(group);
      expect(hasGroup).toBeFalsy();
    });

    it('should return true if the current group has been initialized', () => {
      const group = 'testgroup';
      sut.initState(group);

      const hasGroup = sut.hasGroup(group);
      expect(hasGroup).toBeTruthy();
    });

    it('should add the classes to the group', () => {
      const group = 'testgroup';
      const items = ['Item1', 'Item2'];
      const classes = ['Class1', 'Class2'];

      sut.initState(group, items, classes);
      expect(sut.getClasses(group)).toEqual(classes);
    });
  });

  it('should set the items and then return it', () => {
    const group = 'testGroup';
    const items = ['ItemOne', 'ItemTwo'];
    sut.initState(group);

    sut.setItems(group, items);
    expect(sut.getItems(group)).toEqual(items);
  });

  it('should set the selectedItems and then return it', () => {
    const group = 'testGroup';
    const selectedItems = ['ItemOne', 'ItemTwo'];
    sut.initState(group);

    sut.setSelectedItems(group, selectedItems);
    expect(sut.getSelectedItems(group) as any).toEqual(selectedItems);
  });

  it('should get the first selectedItem', () => {
    const group = 'testGroup';
    const firstItem = 'ItemOne' as any;
    const selectedItems = [firstItem, 'ItemTwo'] as any[];
    sut.initState(group);

    sut.setSelectedItems(group, selectedItems);
    expect(sut.getFirstSelectItem(group)).toEqual(firstItem);
  });

  it('should add selected items', () => {
    const group = 'test-group';
    const selectedItem = 'Item one' as any;
    sut.initState(group);
    sut.addSelectedItem(group, selectedItem);

    expect(sut.getSelectedItems(group) as any).toEqual([selectedItem]);
  });

  it('should remove the selected item', () => {
    const group = 'test-group';
    const itemOne = {node: 'item one'};
    const itemTwo = {node: 'item two'};
    const itemThree = {node: 'item three'};

    const selectedItems = [itemOne, itemTwo, itemThree];
    sut.initState(group);
    sut.setSelectedItems(group, selectedItems);
    sut.removeSelectedItem(group, 'item two' as any);

    expect(sut.getSelectedItems(group) as any).toEqual([itemOne, itemThree]);
  });

});
