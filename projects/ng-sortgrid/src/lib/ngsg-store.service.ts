import {Injectable} from '@angular/core';
import {NgsgDragelement} from './ngsg-dragelement.model';

// TODO add interfaces for classes
export interface NgsgState {
  items: any[];
  classes: any;
  selectedItems: NgsgDragelement[];
}

@Injectable({
  providedIn: 'root'
})
export class NgsgStoreService {

  private state = new Map<string, NgsgState>();

  public initState(key: string, items: any, classes: any): void {
    this.state.set(key, {items: [...items], classes, selectedItems: []});
  }

  public addSelectedItem(key: string, dragElement: NgsgDragelement): void {
    this.state.get(key).selectedItems.push(dragElement);
  }

  public removeSelectedItem(key: string, item: Element): void {
    this.state.get(key).selectedItems.filter(
      (dragElement: NgsgDragelement) => dragElement.node !== item
    );
  }

  public setItems(key: string, items: any): void {
    this.state.get(key).items = [...items];
  }

  public getItems(key: string): any[] {
    return this.state.get(key).items;
  }

  public getSelecteditems(key: string): NgsgDragelement[] {
    return this.state.get(key).selectedItems;
  }

  public resetSelectedItems(key: string): void {
    this.state.get(key).selectedItems = [];
  }

  public getClasses(key: string): any[] {
    return this.state.get(key).classes;
  }

}
