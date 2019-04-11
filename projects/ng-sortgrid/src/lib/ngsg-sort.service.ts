import {Injectable} from '@angular/core';
import {timer} from 'rxjs';

import {NgsgStoreService} from './ngsg-store.service';
import {NgsgSelectionService} from './ngsg-selection.service';
import {NgsgClassService} from './ngsg-class.service';
import {NgsgElementsService} from './ngsg-elements.service';
import {NgsgDragelement} from './ngsg-dragelement.model';

@Injectable({
  providedIn: 'root'
})
export class NgsgSortService {

  private dragIndex: number;
  private dragElements: NgsgDragelement[];

  constructor(private selectionService: NgsgSelectionService, private classService: NgsgClassService,
              private elementsService: NgsgElementsService, private ngsgStore: NgsgStoreService) {
  }

  public initSort(group: string): void {
    this.dragIndex = this.ngsgStore.getFirstSelectItem(group).originalIndex;
    this.dragElements = this.ngsgStore.getSelecteditems(group);
  }

  public sort(dropElement: Element): void {
    const parent = dropElement.parentNode;
    const allElements = Array.from(parent.children);

    const hoverIndex = this.indexOf(allElements, dropElement);
    if (hoverIndex === this.dragIndex) {
      return;
    }

    const el = this.getReferenceElement(allElements, this.dragIndex, hoverIndex);
    if (this.isDropInSelection(el)) {
      return;
    }
    this.dragElements.forEach((dragElement: NgsgDragelement) => {
      const insertedNode = parent.insertBefore(dragElement.node, el.node);
      this.classService.addPlaceHolderClass(insertedNode as Element);
    });
    this.dragIndex = this.indexOf(allElements, this.dragElements[0].node);
  }

  public endSort(dropElement: Element): void {
    const parent = dropElement.parentNode;
    const dropIndex = this.indexOf(parent.children, dropElement);
    this.dragElements.forEach((dragElement: NgsgDragelement) => {
      this.updateDropedItem(dragElement.node);
    });
  }

  private getReferenceElement(collection, dragIndex: number, hoverIndex: number): NgsgDragelement | null {
    const dropElement = collection[hoverIndex];

    if (dragIndex < hoverIndex) {
      return {
        node: dropElement.nextSibling,
        originalIndex: hoverIndex + 1
      };
    } else {
      return {
        node: dropElement,
        originalIndex: hoverIndex
      };
    }
  }

  private isDropInSelection(dropElement: NgsgDragelement): boolean {
    return !!this.dragElements.find((dragElment: NgsgDragelement) => dragElment.node === dropElement.node);
  }

  private indexOf(collection, node: Node): number {
    return Array.prototype.indexOf.call(collection, node);
  }

  private updateDropedItem(item: Element): void {
    this.classService.removePlaceHolderClass(item);
    this.classService.addDroppedClass(item);
    this.classService.removeSelectedClass(item);
    timer(500).subscribe(() => this.classService.removeDroppedClass(item));
  }
}
