import {Injectable} from '@angular/core';
import {SelectionService} from './selection.service';
import {ClassService} from './class.service';
import {timer} from 'rxjs';
import {ElementsService} from './elements.service';
import {Dragelement} from './dragelement.model';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private dragIndex: number;
  private dragElements: Dragelement[];

  constructor(private selectionService: SelectionService, private classService: ClassService, private elementsService: ElementsService) {
  }

  public initSort(dragedElement: Element): void {
    const slectedElements = this.selectionService.getSelectedElements();
    const dragItem = slectedElements.length > 0 ? slectedElements[0] : {
      node: dragedElement,
      originalIndex: this.elementsService.findIndex(dragedElement)
    };
    this.dragIndex = dragItem.originalIndex;
    this.dragElements = slectedElements.length > 0 ? slectedElements : [dragItem];
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
    this.dragElements.forEach((dragElement: Dragelement) => {
      const insertedNode = parent.insertBefore(dragElement.node, el.node);
      this.classService.addPlaceHolderClass(insertedNode as Element);
    });
    this.dragIndex = this.indexOf(allElements, this.dragElements[0].node);
  }

  public endSort(dropElement: Element): void {
    const parent = dropElement.parentNode;
    const dropIndex = this.indexOf(parent.children, dropElement);

    console.log('DropIndex', dropIndex);

    console.log('SelectedElements', this.selectionService.getSelectedElements());

    this.dragElements.forEach((dragElement: Dragelement) => {
      this.updateDropedItem(dragElement.node);
    });
  }

  private getReferenceElement(collection, dragIndex: number, hoverIndex: number): Dragelement | null {
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

  private isDropInSelection(dropElement: Dragelement): boolean {
    return !!this.dragElements.find((dragElment: Dragelement) => dragElment.node === dropElement.node);
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
