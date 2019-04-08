import {Injectable} from '@angular/core';
import {fromEvent, merge, NEVER, Observable, Subject} from 'rxjs';
import {filter, mapTo, switchMap} from 'rxjs/operators';

enum ChangeAction {
  ADD,
  REMOVE
}

interface SelectionChange {
  item: Node;
  action: ChangeAction;
}

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private COMMAND_KEY = 'Meta';
  private CONTROL_KEY = 'Control';

  private selectionChange$ = new Subject<SelectionChange>();
  private selectedElements: Node[] = [];

  constructor() {
    const selectionKeyPressed$ = this.selectionKeyPressed();
    selectionKeyPressed$.pipe(
      switchMap((pressed) => pressed ? this.selectionChange$ : NEVER)
    ).subscribe((selectionChange: SelectionChange) => this.handleSelectionChange(selectionChange));
  }

  private handleSelectionChange(selectionChange: SelectionChange): void {
    if (selectionChange.action === ChangeAction.ADD) {
      this.selectedElements.push(selectionChange.item);
      (selectionChange.item as any).classList.add('selected');
    }
    if (selectionChange.action === ChangeAction.REMOVE) {
      (selectionChange.item as any).classList.remove('selected');
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

  public updateSelectedDragItem(item: Node, selected: boolean): void {
    this.selectionChange$.next({
      item, action: selected ? ChangeAction.ADD : ChangeAction.REMOVE
    });
  }

  public getSelectedElements(): Node[] {
    return this.selectedElements;
  }

  public resetSelectedElements(): void {
    this.selectedElements = [];
  }
}
