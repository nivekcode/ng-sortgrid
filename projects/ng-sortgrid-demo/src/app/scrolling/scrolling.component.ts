import {Component} from '@angular/core';

@Component({
    selector: 'app-scrolling',
    templateUrl: './scrolling.component.html',
    standalone: false
})
export class ScrollingComponent {

  height = 350;
  public items = Array.from(Array(50).keys());
}
