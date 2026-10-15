import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngsg-demo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class NavComponent {
  @Input() fixed = false;
  @Input() height = '140px';
  @Input() subtitle;
}
