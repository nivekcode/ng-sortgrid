import {Injectable} from '@angular/core';
import {fromEvent, merge, NEVER, Observable, Subject} from 'rxjs';
import {filter, mapTo, switchMap} from 'rxjs/operators';
import {ClassService} from './class.service';
import {Dragelement} from './dragelement.model';
import {ElementsService} from './elements.service';
import {NgsgStoreService} from './ngsg-store.service';

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
export class SelectionService {

  private COMMAND_KEY = 'Meta';
  private CONTROL_KEY = 'Control';

  private selectionChange$ = new Subject<SelectionChange>();

  constructor(private classService: ClassService, private elementsService: ElementsService, private ngsgStore: NgsgStoreService) {
    const selectionKeyPressed$ = this.selectionKeyPressed();
    selectionKeyPressed$.pipe(
      switchMap((pressed) => pressed ? this.selectionChange$ : NEVER)
    ).subscribe((selectionChange: SelectionChange) => this.handleSelectionChange(selectionChange));
  }

  private handleSelectionChange(selectionChange: SelectionChange): void {
    if (selectionChange.action === ChangeAction.ADD) {
      this.classService.addSelectedClass(selectionChange.item);
      // TODO pass selectionChangein
      this.ngsgStore.addSelectedItem(selectionChange.key, {
        node: selectionChange.item,
        originalIndex: this.elementsService.findIndex(selectionChange.item)
      });
    }
    if (selectionChange.action === ChangeAction.REMOVE) {
      this.classService.removeSelectedClass(selectionChange.item);
      this.ngsgStore.removeSelectedItem(selectionChange.key, selectionChange.item);
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

  public selectDragItem(key: string, dragedElement: Element): void {
    if (this.ngsgStore.getSelecteditems(key).length > 0) {
      return;
    }
    this.ngsgStore.addSelectedItem(key, {
      node: dragedElement,
      originalIndex: this.elementsService.findIndex(dragedElement)
    });
  }

  public updateSelectedDragItem(key: string, item: Element, selected: boolean): void {
    this.selectionChange$.next({
      key, item, action: selected ? ChangeAction.ADD : ChangeAction.REMOVE
    });
  }
}
