import {Component} from '@angular/core';

@Component({
  selector: 'ngsg-demo-memory',
  templateUrl: 'memory.component.html',
  styleUrls: ['memory.component.css']
})
export class MemoryComponent {

  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

