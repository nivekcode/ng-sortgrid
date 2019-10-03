import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngsg-demo-react-on-changes-memory',
  templateUrl: 'react-on-changes-memory.component.html'
})
export class ReactOnChangesMemoryComponent implements OnInit {

  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public sortOrder: number[];

  ngOnInit(): void {
    this.sortOrder = [...this.items];
  }

  public applyOrder(newOrder: number[]): void {
    this.sortOrder = newOrder;
  }

}
