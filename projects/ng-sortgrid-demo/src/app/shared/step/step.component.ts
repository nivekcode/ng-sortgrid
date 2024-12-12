import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngsg-demo-step',
    templateUrl: 'step.component.html',
    styleUrls: ['step.component.css'],
    standalone: false
})
export class StepComponent {

  @Input() title: string;
  @Input() image: string;
}
