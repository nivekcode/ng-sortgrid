import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

export interface ViewPortOverflow {
  top: boolean;
  bottom: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ViewPortService {

  private window: WindowProxy;

  constructor(@Inject(DOCUMENT) private document) {
    this.window = document.defaultView;
  }

  public isOutOfViewport(element: HTMLElement): ViewPortOverflow {

    const bounding = element.getBoundingClientRect();
    return {
      top: bounding.top < 0,
      bottom: bounding.bottom > (this.window.innerHeight || document.documentElement.clientHeight)
    };
  }
}
