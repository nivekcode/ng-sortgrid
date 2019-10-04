import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-scrolling',
  templateUrl: './scrolling.component.html'
})
export class ScrollingComponent implements OnInit {

  height = 350;
  public items = Array.from(Array(50).keys());

  constructor() {
  }

  ngOnInit() {
  }

}
