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
  private SCROLL_BUFFER = 50;

  constructor(@Inject(DOCUMENT) private document) {
    this.window = document.defaultView;
  }

  public scrollIfNecessary(event: any, scrollPoints: ScrollPoints = {}, scrollSpeed?: number): void {
    const position = event.pageY - this.window.scrollY;

    if (this.isTopScrollNeeded(position, scrollPoints.top)) {
      this.window.scrollBy({top: -scrollSpeed || -this.DEFAULT_SCROLLSPEED, behavior: 'smooth'});
      return;
    }

    if (this.isBottomScrollNeeded(position, scrollPoints.bottom)) {
      this.window.scrollBy({top: scrollSpeed || this.DEFAULT_SCROLLSPEED, behavior: 'smooth'});
    }
  }

  private isTopScrollNeeded(currentPosition: number, scrollPointTop: number): boolean {
    return scrollPointTop ? currentPosition < scrollPointTop :
      currentPosition < this.SCROLL_BUFFER;
  }

  private isBottomScrollNeeded(currentPosition: number, scrollPointBottom: number): boolean {
    return scrollPointBottom ? currentPosition > scrollPointBottom :
      currentPosition > this.window.innerHeight - this.SCROLL_BUFFER;
  }
}
