import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

export interface ScrollPoints {
  top?: number;
  bottom?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollHelperService {

  private window: WindowProxy;
  private DEFAULT_SCROLLSPEED = 50;

  constructor(@Inject(DOCUMENT) private document) {
    this.window = document.defaultView;
  }

  public scrollIfNecessary(element: HTMLElement, scrollPoints: ScrollPoints = {}, scrollSpeed?: number): void {
    const bounding = element.getBoundingClientRect();
    if (this.isTopScrollNeeded(bounding.top, scrollPoints.top)) {
      this.window.scrollBy({top: -scrollSpeed || -this.DEFAULT_SCROLLSPEED, behavior: 'smooth'});
      return;
    }

    if (this.isBottomScrollNeeded(bounding.top, scrollPoints.bottom)) {
      this.window.scrollBy({top: scrollSpeed || this.DEFAULT_SCROLLSPEED, behavior: 'smooth'});
    }
  }

  private isTopScrollNeeded(topBounding: number, scrollPointTop: number): boolean {
    return scrollPointTop ? topBounding < scrollPointTop : topBounding < 0;
  }

  private isBottomScrollNeeded(bottomBounding: number, scrollPointBottom: number): boolean {
    return scrollPointBottom ? bottomBounding < scrollPointBottom : bottomBounding > this.window.innerHeight;
  }
}
