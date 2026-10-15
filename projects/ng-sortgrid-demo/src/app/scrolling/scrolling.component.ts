import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scrolling',
  templateUrl: './scrolling.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ScrollingComponent {
  height = 350;
  public items = Array.from(Array(50).keys());
}
