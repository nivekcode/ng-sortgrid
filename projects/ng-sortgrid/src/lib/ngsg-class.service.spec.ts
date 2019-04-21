import {NgsgClassService} from './ngsg-class.service';
import createSpy = jasmine.createSpy;

describe('NgsgClassService', () => {

  let sut: NgsgClassService;

  beforeEach(() => sut = new NgsgClassService());

  it('should add the placeholder class', () => {
    const addClassSpy = createSpy();
    const element = {classList: {add: addClassSpy}} as any;
    sut.addPlaceHolderClass(element);
    expect(addClassSpy).toHaveBeenCalledWith('ng-sg-placeholder');
  });

  it('should remove the placeholder class', () => {
    const removeClassSpy = createSpy();
    const element = {classList: {remove: removeClassSpy}} as any;
    sut.removePlaceHolderClass(element);
    expect(removeClassSpy).toHaveBeenCalledWith('ng-sg-placeholder');
  });

  it('should add the dropped class', () => {
    const addClassSpy = createSpy();
    const element = {classList: {add: addClassSpy}} as any;
    sut.addDroppedClass(element);
    expect(addClassSpy).toHaveBeenCalledWith('ng-sg-dropped');
  });

  it('should remove the placeholder class', () => {
    const removeClassSpy = createSpy();
    const element = {classList: {remove: removeClassSpy}} as any;
    sut.removeDroppedClass(element);
    expect(removeClassSpy).toHaveBeenCalledWith('ng-sg-dropped');
  });

  it('should add the dropped class', () => {
    const addClassSpy = createSpy();
    const element = {classList: {add: addClassSpy}} as any;
    sut.addSelectedClass(element);
    expect(addClassSpy).toHaveBeenCalledWith('ng-sg-selected');
  });

  it('should remove the placeholder class', () => {
    const removeClassSpy = createSpy();
    const element = {classList: {remove: removeClassSpy}} as any;
    sut.removeSelectedClass(element);
    expect(removeClassSpy).toHaveBeenCalledWith('ng-sg-selected');
  });

  it('should add the dropped class', () => {
    const addClassSpy = createSpy();
    const element = {classList: {add: addClassSpy}} as any;
    sut.addActiveClass(element);
    expect(addClassSpy).toHaveBeenCalledWith('ng-sg-active');
  });

  it('should remove the placeholder class', () => {
    const removeClassSpy = createSpy();
    const element = {classList: {remove: removeClassSpy}} as any;
    sut.removeActiveClass(element);
    expect(removeClassSpy).toHaveBeenCalledWith('ng-sg-active');
  });

});
