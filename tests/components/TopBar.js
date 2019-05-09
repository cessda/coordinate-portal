import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { TopBar, mapStateToProps } from '../../src/components/Topbar';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup() {
  const props = {
    code: 'en'
  };
  const enzymeWrapper = shallow(<TopBar {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('TopBar component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const topBar = enzymeWrapper.find('.level');
    expect(topBar.exists()).toBe(true);
  });

  it('should map state to props', () => {
    const { props } = setup();
    expect(
      mapStateToProps({
        language: {
          code: props.code
        }
      })
    ).toEqual({
      code: props.code
    });
  });
});
