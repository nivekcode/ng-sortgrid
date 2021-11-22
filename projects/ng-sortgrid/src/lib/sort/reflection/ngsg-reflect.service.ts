import { Injectable } from '@angular/core';

import {NgsgElementsHelper} from '../../helpers/element/ngsg-elements.helper';
import {NgsgDragelement} from '../../shared/ngsg-dragelement.model';
import {NgsgStoreService} from '../../store/ngsg-store.service';

@Injectable({
  providedIn: 'root'
})
export class NgsgReflectService {
  constructor(private ngsgStore: NgsgStoreService) {}

  public reflectChanges(key: string, element: Element): any[] {
    const items = this.ngsgStore.getItems(key);
    const selectedElements = this.ngsgStore.getSelectedItems(key);
    const selectedElementIndices = this.getSelectedElementsIndices(selectedElements);
    const selectedItems = this.getSelectedItems(items, selectedElementIndices);
    const sortedIndices = selectedElementIndices.sort(function(a,b) {
      return a - b;
    });
    const dropIndex = this.findDropIndex(selectedElements, element);

    while (sortedIndices.length > 0) {
      items.splice(sortedIndices.pop(), 1);
    }

    const result = this.getReflectedItems(items, selectedItems, dropIndex);
    this.ngsgStore.setItems(key, result);
    return result;
  }

  private getReflectedItems(items: any, selectedItems: any, dropIndex: number): any[] {
    const beforeSelection = items.slice(0, dropIndex);
    const afterSelection = items.slice(dropIndex, items.length);
    return [...beforeSelection, ...selectedItems, ...afterSelection];
  }

  private getSelectedItems(items: any[], selectedElementIndexes: number[]): any[] {
    const selectedItems = [];
    selectedElementIndexes.forEach(index => {
      selectedItems.push(items[index]);
    });
    return selectedItems;
  }

  private getSelectedElementsIndices(selectedElements: NgsgDragelement[]): number[] {
    return selectedElements.map((selectedElement: NgsgDragelement) => selectedElement.originalIndex);
  }

  private findDropIndex(selectedElements: NgsgDragelement[], element: Element): number {
    if (this.isDropInSelection(selectedElements, element)) {
      return NgsgElementsHelper.findIndex(selectedElements[0].node);
    }
    return NgsgElementsHelper.findIndex(element);
  }

  private isDropInSelection(collection: NgsgDragelement[], dropElement: Element): boolean {
    return !!collection.find((dragElment: NgsgDragelement) => dragElment.node === dropElement);
  }
}
