import {ViewPortService} from './view-port.service';
import {beforeEach} from '@angular/core/testing/src/testing_internal';

describe('Viewport helper', () => {

  let sut: ViewPortService;
  const documentMock = {
    defaultView: {
      innerHeight: 0,
      innerWidth: 0
    },
  };

  beforeEach(() => sut = new ViewPortService(documentMock));

  it('should detect when we drag over the top viewport', () => {
    const element = {
      getBoundingClientRect: () => ({top: -100, left: 0, bottom: 0, right: 0})
    } as any;
    const viewPortOverflow = sut.isOutOfViewport(element);
    expect(viewPortOverflow.top).toBeTruthy();
  });

  it('should detect when we drag over the bottom viewport', () => {
    spyOn(window, 'innerHeight').and.returnValue(0);
    const element = {
      getBoundingClientRect: () => ({top: 0, left: 0, bottom: 100, right: 0})
    } as any;
    const viewPortOverflow = sut.isOutOfViewport(element);
    expect(viewPortOverflow.bottom).toBeTruthy();
  });
});
