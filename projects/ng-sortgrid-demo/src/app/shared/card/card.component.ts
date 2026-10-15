import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngsg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CardComponent {
  @Input() item: number;
}
