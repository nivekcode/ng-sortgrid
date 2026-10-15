import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngsg-demo-step',
  templateUrl: 'step.component.html',
  styleUrls: ['step.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class StepComponent {
  @Input() title: string;
  @Input() image: string;
}
