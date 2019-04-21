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

});
