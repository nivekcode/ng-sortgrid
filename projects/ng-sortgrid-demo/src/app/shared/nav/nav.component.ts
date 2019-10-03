import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngsg-demo-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
  @Input() fixed = false;
  @Input() height = '60px';
  @Input() subtitle;
}
