import { Injectable } from '@angular/core';
import { fromEvent, merge, NEVER, Observable, Subject } from 'rxjs';
import { filter, mapTo, switchMap } from 'rxjs/operators';
import {NgsgClassService} from '../helpers/class/ngsg-class.service';
import {NgsgStoreService} from '../store/ngsg-store.service';
import {NgsgElementsHelper} from '../helpers/element/ngsg-elements.helper';

enum ChangeAction {
  ADD,
  REMOVE
}

interface SelectionChange {
  key: string;
  item: Element;
  action: ChangeAction;
}

@Injectable({
  providedIn: 'root'
})
export class NgsgSelectionService {
  private COMMAND_KEY = 'Meta';
  private CONTROL_KEY = 'Control';

  private selectionChange$ = new Subject<SelectionChange>();

  constructor(private classService: NgsgClassService, private ngsgStore: NgsgStoreService) {
    const selectionKeyPressed$ = this.selectionKeyPressed();
    selectionKeyPressed$
      .pipe(switchMap(pressed => (pressed ? this.selectionChange$ : NEVER)))
      .subscribe((selectionChange: SelectionChange) => this.handleSelectionChange(selectionChange));
  }

  private handleSelectionChange(selectionChange: SelectionChange): void {
    if (selectionChange.action === ChangeAction.ADD) {
      this.classService.addSelectedClass(selectionChange.item);
      this.ngsgStore.addSelectedItem(selectionChange.key, {
        node: selectionChange.item,
        originalIndex: NgsgElementsHelper.findIndex(selectionChange.item)
      });
    }
    if (selectionChange.action === ChangeAction.REMOVE) {
      this.classService.removeSelectedClass(selectionChange.item);
      this.ngsgStore.removeSelectedItem(selectionChange.key, selectionChange.item);
    }
  }

  private selectionKeyPressed(): Observable<boolean> {
    const selectionKeyPressed = fromEvent(window, 'keydown').pipe(
      filter(
        (keyboardEvent: KeyboardEvent) =>
          keyboardEvent.key === this.COMMAND_KEY || keyboardEvent.key === this.CONTROL_KEY
      ),
      mapTo(true)
    );
    const keyup = fromEvent(window, 'keyup').pipe(mapTo(false));
    return merge(selectionKeyPressed, keyup);
  }

  public selectElementIfNoSelection(group: string, dragedElement: Element): void {
    if (this.ngsgStore.hasSelectedItems(group)) {
      return;
    }
    this.ngsgStore.addSelectedItem(group, {
      node: dragedElement,
      originalIndex: NgsgElementsHelper.findIndex(dragedElement)
    });
  }

  public updateSelectedDragItem(key: string, item: Element, selected: boolean): void {
    this.selectionChange$.next({
      key,
      item,
      action: selected ? ChangeAction.ADD : ChangeAction.REMOVE
    });
  }
}
