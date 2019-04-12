export class NgsgElementsHelper {
  public static findIndex(element: Element): number {
    const allElements = element.parentNode.children;
    return Array.prototype.indexOf.call(allElements, element);
  }
}
