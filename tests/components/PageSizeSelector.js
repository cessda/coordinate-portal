import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { PageSizeSelector } from '../../src/components/PageSizeSelector';
import searchkit from '../../src/utilities/searchkit';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup() {
  const props = {
    searchkit: searchkit,
    options: [10, 30, 50, 150]
  };
  const enzymeWrapper = shallow(<PageSizeSelector {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('PageSizeSelector component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should handle has hits', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.instance().hasHits()).toBe(true);
  });
});
