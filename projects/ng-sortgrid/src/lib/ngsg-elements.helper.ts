import {NgsgDragelement} from './ngsg-dragelement.model';

export class NgsgElementsHelper {

  public static findIndex(element: Element): number {
    const allElements = element.parentNode.children;
    return Array.prototype.indexOf.call(allElements, element);
  }

  public static getSibling(dropElement: any, dragIndex: number, hoverIndex: number): NgsgDragelement | null {
    if (dragIndex < hoverIndex) {
      return {node: dropElement.nextSibling, originalIndex: hoverIndex + 1};
    }
    return {node: dropElement, originalIndex: hoverIndex};
  }
}
