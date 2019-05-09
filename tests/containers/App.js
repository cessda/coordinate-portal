import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { App, mapDispatchToProps } from '../../src/containers/App';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render container for test.
function setup() {
  const props = {
    initSearchkit: jest.fn(),
    initTranslations: jest.fn(),
    children: <div/>
  };
  const enzymeWrapper = shallow(<App {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('App container', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should map dispatch to props', () => {
    expect(mapDispatchToProps()).toEqual({
      initSearchkit: expect.any(Function),
      initTranslations: expect.any(Function)
    });
  });
});
