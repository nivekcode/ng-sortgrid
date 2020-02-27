import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

import {NgsgOrderChange} from '../../../../../../ng-sortgrid/src/lib/shared/ngsg-order-change.model';

@Component({
  selector: 'ngsg-demo-async',
  templateUrl: './async-pipe-memory.component.html',
  styleUrls: ['./async-pipe-memory.component.css']
})
export class AsyncPipeMemoryComponent implements OnInit {

  item$: Observable<number[]>;
  loading = false;
  public currentSortOrder: number[];
  public previousSortOrder: number[];

  ngOnInit(): void {
    this.previousSortOrder = [];
    this.currentSortOrder = [];
  }

  public loadItems(): void {
    this.loading = true;
    this.item$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
      delay(1500),
      tap(() => this.loading = false)
    );
  }

  public applyOrder(orderChange: NgsgOrderChange<number>): void {
    this.currentSortOrder = orderChange.currentOrder;
    this.previousSortOrder = orderChange.previousOrder;
  }
}
