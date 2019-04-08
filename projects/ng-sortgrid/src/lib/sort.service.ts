import {Injectable} from '@angular/core';
import {SelectionService} from './selection.service';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private dragIndex: number;
  private dragElements: Node[];

  constructor(private selectionService: SelectionService) {
  }

  public initSort(dragedElement: Node): void {
    const slectedElements = this.selectionService.getSelectedElements();
    const dragItem = slectedElements.length > 0 ? slectedElements[0] : dragedElement;
    this.dragIndex = this.indexOf(dragItem.parentNode.children, dragItem);
    this.dragElements = slectedElements.length > 0 ? slectedElements : [dragItem];
  }

  public sort(dropElement: Node): void {
    const parent = dropElement.parentNode;
    const allElements = Array.from(parent.children);

    const hoverIndex = this.indexOf(allElements, dropElement);
    if (hoverIndex === this.dragIndex) {
      return;
    }

    const el = this.getReferenceElement(allElements, this.dragIndex, hoverIndex);
    if (this.dragElements.includes(el)) {
      return;
    }
    this.dragElements.forEach(dragElement => {
      const insertedNode = parent.insertBefore(dragElement, el);
      (insertedNode as any).classList.add('placeholder');
    });
    this.dragIndex = this.indexOf(allElements, this.dragElements[0]);
  }

  private getReferenceElement(collection, dragIndex: number, hoverIndex: number): Node | null {
    const dropElement = collection[hoverIndex];
    return dragIndex < hoverIndex ? dropElement.nextSibling : dropElement;
  }

  private indexOf(collection, node: Node): number {
    return Array.prototype.indexOf.call(collection, node);
  }
}
