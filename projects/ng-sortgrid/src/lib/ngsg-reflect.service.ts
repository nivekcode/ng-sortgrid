import {Injectable} from '@angular/core';

import {NgsgStoreService} from './ngsg-store.service';
import {NgsgSelectionService} from './ngsg-selection.service';
import {NgsgDragelement} from './ngsg-dragelement.model';
import {NgsgElementsHelper} from './ngsg-elements.helper';

@Injectable({
  providedIn: 'root'
})
export class NgsgReflectService<T> {

  constructor(private selectionService: NgsgSelectionService, private ngsgStore: NgsgStoreService) {
  }

  public reflectChanges(key: string, element: Element): T[] {
    let dropIndex;

    const items = this.ngsgStore.getItems(key);
    const selectedElements = this.ngsgStore.getSelecteditems(key);

    if (this.isDropInSelection(selectedElements, element)) {
      dropIndex = NgsgElementsHelper.findIndex(selectedElements[0].node);
    } else {
      dropIndex = NgsgElementsHelper.findIndex(element);
    }

    const selectedElementIndexes = [...selectedElements].map(
      (selectedElement: NgsgDragelement) => selectedElement.originalIndex
    );

    const selectedItems = [];

    selectedElementIndexes.forEach(index => {
      selectedItems.push(items[index]);
    });

    const popIndexes = selectedElementIndexes.sort();

    while (popIndexes.length > 0) {
      items.splice(popIndexes.pop(), 1);
    }

    const beforeSelection = items.slice(0, dropIndex);
    const afterSelection = items.slice(dropIndex, items.length);

    const result = [...beforeSelection, ...selectedItems, ...afterSelection];
    this.ngsgStore.setItems(key, result);
    return result;
  }

  private isDropInSelection(collection: NgsgDragelement[], dropElement: Element): boolean {
    return !!collection.find((dragElment: NgsgDragelement) => dragElment.node === dropElement);
  }
}
