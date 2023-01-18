import {ScrollHelperService} from './scroll-helper.service';

describe('Scroll helper', () => {

  let sut: ScrollHelperService;
  const documentMock = {
    defaultView: {
      innerHeight: 0,
      innerWidth: 0,
      scrollBy: jest.fn()
    } as any
  };
  let scrollSpy: any;

  beforeEach(() => {
    sut = new ScrollHelperService(documentMock);
    scrollSpy = jest.spyOn(documentMock.defaultView, 'scrollBy');
  });

  describe('Top scroll', () => {

    it(`should scroll to the top with the default scroll speed when we drag over
    the top viewport + scroll buffer`, () => {
      documentMock.defaultView.scrollY = 0;
      const event = {
        pageY: 40
      };
      sut.scrollIfNecessary(event);
      expect(scrollSpy).toHaveBeenCalledWith({top: -50, behavior: 'smooth'});
    });

    it('should scroll to the top with the default scroll speed when we drag over the top scroll position', () => {
      documentMock.defaultView.scrollY = 0;
      const event = {
        pageY: 110
      };
      sut.scrollIfNecessary(event, {top: 140});
      expect(scrollSpy).toHaveBeenCalledWith({top: -50, behavior: 'smooth'});
    });

    it('should scroll to the top with the custom scroll speed when we drag over the top viewport', () => {
      documentMock.defaultView.scrollY = 0;
      const event = {
        pageY: 40
      };
      const scrollSpeed = 100;
      sut.scrollIfNecessary(event, {}, scrollSpeed);
      expect(scrollSpy).toHaveBeenCalledWith({top: -scrollSpeed, behavior: 'smooth'});
    });

  });

  describe('Bottom scroll', () => {

    it(`should scroll to the bottom with the default scroll speed when we drag
    over the bottom viewport - scroll buffer`, () => {
      documentMock.defaultView.scrollY = 0;
      documentMock.defaultView.innerHeight = 100;
      const event = {
        pageY: 80
      };
      sut.scrollIfNecessary(event);
      expect(scrollSpy).toHaveBeenCalledWith({top: 50, behavior: 'smooth'});
    });

    it('should scroll to the bottom with the default scroll speed when we drag over the bottom scroll position', () => {
      documentMock.defaultView.scrollY = 0;
      const event = {
        pageY: 141
      };
      sut.scrollIfNecessary(event, {bottom: 140});
      expect(scrollSpy).toHaveBeenCalledWith({top: 50, behavior: 'smooth'});
    });

    it('should scroll to the top with the custom scroll speed when we drag over the top viewport', () => {
      documentMock.defaultView.scrollY = 0;
      const event = {
        pageY: 110
      };
      const scrollSpeed = 100;
      sut.scrollIfNecessary(event, {}, scrollSpeed);
      expect(scrollSpy).toHaveBeenCalledWith({top: scrollSpeed, behavior: 'smooth'});
    });

  });
});
