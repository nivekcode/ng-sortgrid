import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  public findIndex(element: Element): number {
    const allElements = element.parentNode.children;
    return Array.prototype.indexOf.call(allElements, element);
  }
}
