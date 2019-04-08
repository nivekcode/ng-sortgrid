import {Injectable} from '@angular/core';
import {fromEvent, merge, NEVER, Observable, Subject} from 'rxjs';
import {filter, mapTo, switchMap} from 'rxjs/operators';
import {ClassService} from './class.service';

enum ChangeAction {
  ADD,
  REMOVE
}

interface SelectionChange {
  item: Element;
  action: ChangeAction;
}

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private COMMAND_KEY = 'Meta';
  private CONTROL_KEY = 'Control';

  private selectionChange$ = new Subject<SelectionChange>();
  private selectedElements: Element[] = [];

  constructor(private classService: ClassService) {
    const selectionKeyPressed$ = this.selectionKeyPressed();
    selectionKeyPressed$.pipe(
      switchMap((pressed) => pressed ? this.selectionChange$ : NEVER)
    ).subscribe((selectionChange: SelectionChange) => this.handleSelectionChange(selectionChange));
  }

  private handleSelectionChange(selectionChange: SelectionChange): void {
    if (selectionChange.action === ChangeAction.ADD) {
      this.classService.addSelectedClass(selectionChange.item);
      this.selectedElements.push(selectionChange.item);
    }
    if (selectionChange.action === ChangeAction.REMOVE) {
      this.classService.removeSelectedClass(selectionChange.item);
      this.selectedElements = this.selectedElements.filter(
        (element: Node) => element !== selectionChange.item
      );
    }
  }

  private selectionKeyPressed(): Observable<boolean> {
    const selectionKeyPressed = fromEvent(window, 'keydown').pipe(
      filter((keyboardEvent: KeyboardEvent) => keyboardEvent.key === this.COMMAND_KEY || keyboardEvent.key === this.CONTROL_KEY),
      mapTo(true)
    );
    const keyup = fromEvent(window, 'keyup').pipe(mapTo(false));
    return merge(selectionKeyPressed, keyup);
  }

  public updateSelectedDragItem(item: Element, selected: boolean): void {
    this.selectionChange$.next({
      item, action: selected ? ChangeAction.ADD : ChangeAction.REMOVE
    });
  }

  public getSelectedElements(): Element[] {
    return this.selectedElements;
  }

  public resetSelectedElements(): void {
    this.selectedElements = [];
  }
}
