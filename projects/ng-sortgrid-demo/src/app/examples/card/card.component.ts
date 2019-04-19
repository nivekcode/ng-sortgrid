import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngsg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() item: number;
}
