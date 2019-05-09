import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mapStateToProps, NoHits } from '../../src/components/NoHits';
import searchkit from '../../src/utilities/searchkit';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup() {
  const props = {
    searchkit: searchkit,
    code: 'en'
  };
  const enzymeWrapper = shallow(<NoHits {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('NoHits component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists()).toBe(true);
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
