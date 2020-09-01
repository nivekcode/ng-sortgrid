import { NgsgElementsHelper } from '../helpers/element/ngsg-elements.helper';

import { NgsgSelectionService } from './ngsg-selection.service';

describe('NgsgSelectionService', () => {
  const ngsgClassService = {
    addSelectedClass: jest.fn(),
    removeSelectedClass: jest.fn(),
  } as any;

  const ngsgStore = {
    addSelectedItem: jest.fn(),
    getSelectedItems: jest.fn(),
    hasSelectedItems: jest.fn(),
    removeSelectedItem: jest.fn(),
    resetSelectedItems: jest.fn(),
  } as any;

  let sut: NgsgSelectionService;

  beforeEach(() => {
    sut = new NgsgSelectionService(ngsgClassService, ngsgStore);
  });

  afterEach(() => {
    const keyupEvent = new KeyboardEvent('keyun', {});
    window.dispatchEvent(keyupEvent);
  });

  describe('selectElementIfNoSelection', () => {
    it('should call hasSelectedItems with the group', () => {
      ngsgStore.hasSelectedItems = jest.fn();
      ngsgStore.hasSelectedItems.mockReturnValue(true);
      const dragedElement = 'Cool element' as any;
      const group = 'herogroup';

      sut.selectElementIfNoSelection(group, dragedElement);
      expect(ngsgStore.hasSelectedItems).toHaveBeenCalledWith(group);
    });

    it('should not addSelectedItem to the store if there are allready items selected', () => {
      ngsgStore.hasSelectedItems = () => true;
      const dragedElement = 'Cool element' as any;
      const group = 'herogroup';

      sut.selectElementIfNoSelection(group, dragedElement);
      expect(ngsgStore.addSelectedItem).not.toHaveBeenCalled();
    });

    it('should addSelectedItem to the store if no item is yet selected', () => {
      ngsgStore.hasSelectedItems = () => false;
      ngsgStore.addSelectedItem = jest.fn();
      const dragedElement = 'Cool element' as any;
      const group = 'herogroup';
      const originalIndex = 2;

      const findIndexSpy = jest.fn();
      findIndexSpy.mockReturnValue(originalIndex);
      NgsgElementsHelper.findIndex = findIndexSpy;

      sut.selectElementIfNoSelection(group, dragedElement);

      expect(findIndexSpy).toHaveBeenCalledWith(dragedElement);
      expect(ngsgStore.addSelectedItem).toHaveBeenCalledWith(group, {
        node: dragedElement,
        originalIndex,
      });
    });

    describe('Selection change', () => {
      it('should add the selectedItem if the Meta key is pressed and the item is clicked', () => {
        const event = new KeyboardEvent('keydown', {
          key: 'Meta',
        });
        const group = 'groupOne';
        const item = 'Some element' as any;
        const selected = true;
        const index = 2;
        NgsgElementsHelper.findIndex = () => index;

        window.dispatchEvent(event);
        sut.updateSelectedDragItem(group, item, selected);

        expect(ngsgStore.addSelectedItem).toHaveBeenCalledWith(group, { node: item, originalIndex: index });
      });

      it('should remove the selectedItem if the Meta key is pressed and the selected item is clicked', () => {
        const event = new KeyboardEvent('keydown', {
          key: 'Meta',
        });
        const group = 'groupOne';
        const item = 'Some element' as any;
        const selected = false;
        const index = 2;
        NgsgElementsHelper.findIndex = () => index;

        window.dispatchEvent(event);
        sut.updateSelectedDragItem(group, item, selected);

        expect(ngsgStore.removeSelectedItem).toHaveBeenCalledWith(group, item);
      });

      it(`should remove the selected class from the selected item if the Meta key is pressed
      and the selected item is clicked`, () => {
        const event = new KeyboardEvent('keydown', {
          key: 'Meta',
        });
        const group = 'groupOne';
        const item = 'Some element' as any;
        const selected = false;
        const index = 2;
        NgsgElementsHelper.findIndex = () => index;

        window.dispatchEvent(event);
        sut.updateSelectedDragItem(group, item, selected);

        expect(ngsgClassService.removeSelectedClass).toHaveBeenCalledWith(item);
      });

      it(`should reset the selected items if we click on an item without holding the shift key`, () => {
        const event = new KeyboardEvent('keyup', {
          key: 'Meta',
        });
        const itemOne = { node: 'Foo' } as any;
        const itemTwo = { node: 'Bar' } as any;
        const items = [itemOne, itemTwo];
        const group = 'groupOne';
        const item = 'Some element' as any;
        const selected = false;
        const index = 2;

        NgsgElementsHelper.findIndex = () => index;
        ngsgStore.getSelectedItems = () => items;
        window.dispatchEvent(event);
        sut.updateSelectedDragItem(group, item, selected);

        expect(ngsgClassService.removeSelectedClass).toHaveBeenCalledWith(itemOne.node);
        expect(ngsgClassService.removeSelectedClass).toHaveBeenCalledWith(itemTwo.node);
        expect(ngsgStore.resetSelectedItems).toHaveBeenCalledWith(group);
      });
    });
  });
});
