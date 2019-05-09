import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Tooltip } from '../../src/components/Tooltip';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup() {
  const props = {
    content: 'Content'
  };
  const enzymeWrapper = shallow(<Tooltip {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Tooltip component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const tooltip = enzymeWrapper.find('.dropdown');
    expect(tooltip.exists()).toBe(true);
  });

  it('should display content', () => {
    const { props, enzymeWrapper } = setup();
    const tooltip = enzymeWrapper.find('.dropdown');
    expect(tooltip.find('p').text()).toBe(props.content);
  });
});
