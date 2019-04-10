import {Injectable} from '@angular/core';
import {SelectionService} from './selection.service';
import {ElementsService} from './elements.service';
import {Dragelement} from './dragelement.model';

@Injectable({
  providedIn: 'root'
})
export class NgsgReflectService<T> {

  private items: T[];

  constructor(private selectionService: SelectionService, private elmentsService: ElementsService) {
  }

  public initItems(items: T[]): void {
    this.items = [...items];
  }

  public reflectChanges(element: Element): T[] {
    let dropIndex;

    const selectedElements = this.selectionService.getSelectedElements();

    if (this.isDropInSelection(selectedElements, element)) {
      dropIndex = this.elmentsService.findIndex(selectedElements[0].node);
    } else {
      dropIndex = this.elmentsService.findIndex(element);
    }

    // TODO - check if index is included in elements
    /*
    if(selectedElements.includes(element)){
      dropIndex = selectedElements[0];
    }
    */

    const selectedElementIndexes = [...this.selectionService.getSelectedElements()].map(
      (selectedElement: Dragelement) => selectedElement.originalIndex
    );

    console.log('DropIndex', dropIndex);

    const selectedItems = [];

    selectedElementIndexes.forEach(index => {
      selectedItems.push(this.items[index]);
    });

    const popIndexes = selectedElementIndexes.sort();

    while (popIndexes.length > 0) {
      const i = this.items.splice(popIndexes.pop(), 1);
      console.log('poppin', i);
      console.log('New Items', this.items);
    }

    console.log('At the time', this.items);

    const beforeSelection = this.items.slice(0, dropIndex);
    const afterSelection = this.items.slice(dropIndex, this.items.length);

    console.log('Before', beforeSelection);
    console.log('After', afterSelection);
    console.log('selected', selectedItems);

    return [...beforeSelection, ...selectedItems, ...afterSelection];
  }

  private isDropInSelection(collection: Dragelement[], dropElement: Element): boolean {
    return !!collection.find((dragElment: Dragelement) => dragElment.node === dropElement);
  }
}
