import {Injectable} from '@angular/core';
import {SelectionService} from './selection.service';
import {ElementsService} from './elements.service';
import {Dragelement} from './dragelement.model';
import {NgsgStoreService} from './ngsg-store.service';

@Injectable({
  providedIn: 'root'
})
export class NgsgReflectService<T> {

  constructor(private selectionService: SelectionService, private elmentsService: ElementsService, private ngsgStore: NgsgStoreService) {
  }

  public reflectChanges(key: string, element: Element): T[] {
    let dropIndex;

    const items = this.ngsgStore.getItems(key);
    const selectedElements = this.ngsgStore.getSelecteditems(key);

    if (this.isDropInSelection(selectedElements, element)) {
      dropIndex = this.elmentsService.findIndex(selectedElements[0].node);
    } else {
      dropIndex = this.elmentsService.findIndex(element);
    }

    const selectedElementIndexes = [...selectedElements].map(
      (selectedElement: Dragelement) => selectedElement.originalIndex
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

  private isDropInSelection(collection: Dragelement[], dropElement: Element): boolean {
    return !!collection.find((dragElment: Dragelement) => dragElment.node === dropElement);
  }
}
