export class NgsgElementsHelper {
  public static findIndex(element: Element): number {
    const allElements = element.parentNode.children;
    return Array.prototype.indexOf.call(allElements, element);
  }

  public static findHost(element: Element, selector: string): Element {
    const parentElement = element.parentElement;
    if (parentElement.matches(selector)) {
      return parentElement;
    }
    return this.findHost(parentElement, selector);
  }
}
