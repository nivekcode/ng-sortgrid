import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgsgClassService {
  private SELECTED_DEFAULT_CLASS = 'ng-sg-selected';
  private PLACEHOLDER_DEFAULT_CLASS = 'ng-sg-placeholder';
  private DROPPED_DEFAULT_CLASS = 'ng-sg-dropped';
  private ACTIVE_DEFAULT_CLASS = 'ng-sg-active';

  public addPlaceHolderClass(element: Element): void {
    element.classList.add(this.PLACEHOLDER_DEFAULT_CLASS);
  }

  public removePlaceHolderClass(element: Element): void {
    element.classList.remove(this.PLACEHOLDER_DEFAULT_CLASS);
  }

  public addDroppedClass(element: Element): void {
    element.classList.add(this.DROPPED_DEFAULT_CLASS);
  }

  public removeDroppedClass(element: Element): void {
    element.classList.remove(this.DROPPED_DEFAULT_CLASS);
  }

  public addSelectedClass(element: Element): void {
    element.classList.add(this.SELECTED_DEFAULT_CLASS);
  }

  public removeSelectedClass(element: Element): void {
    element.classList.remove(this.SELECTED_DEFAULT_CLASS);
  }

  public addActiveClass(element: Element): void {
    element.classList.add(this.ACTIVE_DEFAULT_CLASS);
  }

  public removeActiveClass(element: Element): void {
    element.classList.remove(this.ACTIVE_DEFAULT_CLASS);
  }

}
