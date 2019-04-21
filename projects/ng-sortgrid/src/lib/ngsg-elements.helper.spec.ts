import {NgsgElementsHelper} from './ngsg-elements.helper';

describe('NgsgElementsHelper', () => {

  it('must return the correct index of the element', () => {
    const elementOne = {name: 'child one'} as any;
    const elementTwo = {name: 'child two'} as any;
    const elementThree = {name: 'chil three'} as any;
    const elementFour = {name: 'chil four'} as any;

    const children = [elementOne, elementTwo, elementThree, elementFour];
    elementOne.parentNode = {children};
    elementTwo.parentNode = {children};
    elementThree.parentNode = {children};
    elementFour.parentNode = {children};

    const index = NgsgElementsHelper.findIndex(elementThree);
    expect(index).toBe(2);
  });

  it('must find the element that matches the selector', () => {
    const selector = 'sample-selector';
    const result = {
      matches: (s) => s === selector,
      name: 'parentElement'
    };
    const element = {
      parentElement: {
        matches: () => false,
        parentElement: result
      }
    } as any;
    const findHostSpy = spyOn(NgsgElementsHelper, 'findHost');
    findHostSpy.and.callThrough();

    NgsgElementsHelper.findHost(element, selector);
    expect(findHostSpy).toHaveBeenCalledTimes(2);
  });

  it('must retunr the element that matches the selector', () => {
    const selector = 'sample-selector';
    const result = {
      matches: (s) => s === selector,
      name: 'parentElement'
    };
    const element = {
      parentElement: {
        matches: () => false,
        parentElement: result
      }
    } as any;
    const findHostSpy = spyOn(NgsgElementsHelper, 'findHost');
    findHostSpy.and.callThrough();

    const actual = NgsgElementsHelper.findHost(element, selector);
    expect((actual as any)).toEqual(result);
  });

});
