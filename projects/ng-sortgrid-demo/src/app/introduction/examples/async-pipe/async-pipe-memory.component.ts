import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'ngsg-demo-async',
  templateUrl: './async-pipe-memory.component.html',
  styleUrls: ['./async-pipe-memory.component.css', '../memory-demo.css']
})
export class AsyncPipeMemoryComponent {

  item$: Observable<number[]>;
  loading = false;
  public sortOrder: number[];

  public loadItems(): void {
    this.loading = true;
    this.item$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
      delay(1500),
      tap(() => this.loading = false)
    );
  }

  public applyOrder(newOrder: number[]): void {
    this.sortOrder = newOrder;
  }

}
