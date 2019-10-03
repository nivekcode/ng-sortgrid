import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

import {NgsgDragelement} from '../../shared/ngsg-dragelement.model';
import {NgsgClassService} from '../../helpers/class/ngsg-class.service';
import {NgsgStoreService} from '../../store/ngsg-store.service';
import {NgsgElementsHelper} from '../../helpers/element/ngsg-elements.helper';

@Injectable({
  providedIn: 'root'
})
export class NgsgSortService {
  private dragIndex: number;
  private dragElements: NgsgDragelement[];

  constructor(
    private classService: NgsgClassService,
    private ngsgStore: NgsgStoreService
  ) {}

  public initSort(group: string): void {
    this.dragIndex = this.ngsgStore.getFirstSelectItem(group).originalIndex;
    this.dragElements = this.ngsgStore.getSelectedItems(group);
  }

  public sort(dropElement: Element): void {
    const hoverIndex = NgsgElementsHelper.findIndex(dropElement);
    const el = this.getSibling(dropElement, this.dragIndex, hoverIndex);

    if (this.isDropInSelection(el)) {
      return;
    }
    this.dragElements.forEach((dragElement: NgsgDragelement) => {
      const insertedNode = dropElement.parentNode.insertBefore(dragElement.node, el.node);
      this.classService.addPlaceHolderClass(insertedNode as Element);
    });
    this.dragIndex = NgsgElementsHelper.findIndex(this.dragElements[0].node);
  }

  public endSort(): void {
    this.dragElements.forEach((dragElement: NgsgDragelement) => {
      this.updateDropedItem(dragElement.node);
    });
  }

  private getSibling(dropElement: any, dragIndex: number, hoverIndex: number): NgsgDragelement | null {
    if (dragIndex < hoverIndex) {
      return { node: dropElement.nextSibling, originalIndex: hoverIndex + 1 };
    }
    return { node: dropElement, originalIndex: hoverIndex };
  }

  private isDropInSelection(dropElement: NgsgDragelement): boolean {
    return !!this.dragElements.find((dragElment: NgsgDragelement) => dragElment.node === dropElement.node);
  }

  private updateDropedItem(item: Element): void {
    this.classService.removePlaceHolderClass(item);
    this.classService.addDroppedClass(item);
    this.classService.removeSelectedClass(item);
    timer(500).subscribe(() => this.classService.removeDroppedClass(item));
  }
}
