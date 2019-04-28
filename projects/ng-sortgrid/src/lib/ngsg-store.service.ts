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

  public initState(group: string, items: any[] = [], classes: any = {}): void {
    this.state.set(group, {items: [...items], classes, selectedItems: []});
  }

  public addSelectedItem(group: string, dragElement: NgsgDragelement): void {
    this.state.get(group).selectedItems.push(dragElement);
  }

  public removeSelectedItem(group: string, item: Element): void {
    const updatedItems = this.state.get(group).selectedItems
      .filter((dragElement: NgsgDragelement) => dragElement.node !== item);
    this.setSelectedItems(group, updatedItems);
  }

  public setItems(group: string, items: any): void {
    this.state.get(group).items = [...items];
  }

  public getItems(group: string): any[] {
    return this.state.get(group).items;
  }

  public hasItems(group: string): boolean {
    return this.getItems(group).length > 0;
  }

  public hasGroup(group: string): boolean {
    return this.state.has(group);
  }

  public getSelectedItems(group: string): NgsgDragelement[] {
    return this.state.get(group).selectedItems;
  }

  public setSelectedItems(group: string, selectedItems: any[]): void {
    this.state.get(group).selectedItems = [...selectedItems];
  }

  public getFirstSelectItem(group: string): NgsgDragelement {
    return this.state.get(group).selectedItems[0];
  }

  public hasSelectedItems(group: string): boolean {
    return this.getSelectedItems(group).length > 0;
  }

  public resetSelectedItems(group: string): void {
    this.setSelectedItems(group, []);
  }

  public getClasses(group: string): any[] {
    return this.state.get(group).classes;
  }
}
