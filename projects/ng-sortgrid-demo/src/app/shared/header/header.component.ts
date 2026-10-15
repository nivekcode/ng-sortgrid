import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngsg-demo-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class HeaderComponent {}
