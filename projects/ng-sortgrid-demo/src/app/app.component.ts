import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  public gridOneSorted(sortedItems: any): void {
    console.log('Grid one sorted', sortedItems);
  }

  public gridTwoSorted(sortedItems: any): void {
    console.log('Grid two sorted', sortedItems);
  }
}
