import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngsg-demo-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    standalone: false
})
export class NavComponent {
  @Input() fixed = false;
  @Input() height = '140px';
  @Input() subtitle;
}
