import {Component, OnInit} from '@angular/core';
import {NgsgOrderChange} from '../../../../../../ng-sortgrid/src/lib/shared/ngsg-order-change.model';

@Component({
  selector: 'ngsg-demo-react-on-changes-memory',
  templateUrl: 'react-on-changes-memory.component.html'
})
export class ReactOnChangesMemoryComponent implements OnInit {

  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public currentSortOrder: number[];
  public previousSortOrder: number[];

  ngOnInit(): void {
    this.currentSortOrder = [...this.items];
    this.previousSortOrder = [];
  }

  public applyOrder(orderChange: NgsgOrderChange<number>): void {
    this.currentSortOrder = orderChange.currentOrder;
    this.previousSortOrder = orderChange.previousOrder;
  }

}
