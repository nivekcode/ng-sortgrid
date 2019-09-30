import {ScrollHelperService} from './scroll-helper.service';
import SpyObj = jasmine.SpyObj;

describe('Scroll helper', () => {

  let sut: ScrollHelperService;
  const documentMock = {
    defaultView: {
      innerHeight: 0,
      innerWidth: 0,
      scrollBy: () => {
      }
    }
  };
  let scrollSpy: SpyObj<any>;

  beforeEach(() => {
    sut = new ScrollHelperService(documentMock);
    scrollSpy = spyOn(documentMock.defaultView, 'scrollBy');
  });

  describe('Top scroll', () => {

    it('should scroll to the top with the default scroll speed when we drag over the top viewport', () => {
      const element = {
        getBoundingClientRect: () => ({top: -100, left: 0, bottom: 0, right: 0})
      } as any;
      sut.scrollIfNecessary(element);
      expect(scrollSpy).toHaveBeenCalledWith({top: -50, behavior: 'smooth'});
    });

    it('should scroll to the top with the default scroll speed when we drag over the top scroll position', () => {
      const element = {
        getBoundingClientRect: () => ({top: 120, left: 0, bottom: 0, right: 0})
      } as any;
      sut.scrollIfNecessary(element, {top: 140});
      expect(scrollSpy).toHaveBeenCalledWith({top: -50, behavior: 'smooth'});
    });

    it('should scroll to the top with the custom scroll speed when we drag over the top viewport', () => {
      const element = {
        getBoundingClientRect: () => ({top: -100, left: 0, bottom: 0, right: 0})
      } as any;
      const scrollSpeed = 100;
      sut.scrollIfNecessary(element, {}, scrollSpeed);
      expect(scrollSpy).toHaveBeenCalledWith({top: -scrollSpeed, behavior: 'smooth'});
    });

  });

  describe('Bottom scroll', () => {

    it('should scroll to the bottom with the default scroll speed when we drag over the bottom viewport', () => {
      const element = {
        getBoundingClientRect: () => ({top: 100, left: 0, bottom: 20, right: 0})
      } as any;
      sut.scrollIfNecessary(element);
      expect(scrollSpy).toHaveBeenCalledWith({top: 50, behavior: 'smooth'});
    });

    it('should scroll to the bottom with the default scroll speed when we drag over the bottom scroll position', () => {
      const element = {
        getBoundingClientRect: () => ({top: 120, left: 0, bottom: 200, right: 0})
      } as any;
      sut.scrollIfNecessary(element, {bottom: 140});
      expect(scrollSpy).toHaveBeenCalledWith({top: 50, behavior: 'smooth'});
    });

    it('should scroll to the top with the custom scroll speed when we drag over the top viewport', () => {
      const element = {
        getBoundingClientRect: () => ({top: 20, left: 0, bottom: 20, right: 0})
      } as any;
      const scrollSpeed = 100;
      sut.scrollIfNecessary(element, {}, scrollSpeed);
      expect(scrollSpy).toHaveBeenCalledWith({top: scrollSpeed, behavior: 'smooth'});
    });

  });
});
