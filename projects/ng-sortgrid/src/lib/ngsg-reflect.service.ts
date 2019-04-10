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
    const dropIndex = this.elmentsService.findIndex(element);
    const selectedElementIndexes = [...this.selectionService.getSelectedElements()].map(
      (selectedElement: Dragelement) => selectedElement.originalIndex
    );

    const selectedItems = [];

    while (selectedElementIndexes.length > 0) {
      const selectedItem = this.items.splice(selectedElementIndexes.pop(), 1)[0];
      selectedItems.push(selectedItem);
    }
    const beforeSelection = this.items.slice(0, dropIndex - 1);
    const afterSelection = this.items.slice(dropIndex - 1, this.items.length);

    return [...beforeSelection, ...selectedItems.reverse(), ...afterSelection];
  }

}
