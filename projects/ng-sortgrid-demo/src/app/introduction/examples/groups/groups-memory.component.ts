import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngsg-demo-groups-memory',
  templateUrl: 'groups-memory.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class GroupsMemoryComponent {
  public items = [1, 2, 3, 4];
}
