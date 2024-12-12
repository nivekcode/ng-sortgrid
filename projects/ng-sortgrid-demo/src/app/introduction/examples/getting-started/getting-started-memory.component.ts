import {Component} from '@angular/core';

@Component({
    selector: 'ngsg-demo-memory',
    templateUrl: 'getting-started-memory.component.html',
    standalone: false
})
export class GettingStartedMemoryComponent {

  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
}

