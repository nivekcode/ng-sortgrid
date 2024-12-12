import {Component} from '@angular/core';

@Component({
    selector: 'ngsg-demo-drag-handle',
    templateUrl: 'drag-handle.component.html',
    styleUrls: ['./drag-handle.component.css'],
    standalone: false
})
export class DragHandleComponent {

  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

