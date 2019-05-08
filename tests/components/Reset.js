import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mapStateToProps, Reset } from '../../src/components/Reset';
import * as _ from 'lodash';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup(props) {
  props = _.extend(
    {
      pathname: '/',
      bemBlock: jest.fn(),
      hasFilters: false,
      translate: jest.fn(),
      resetFilters: jest.fn()
    },
    props || {}
  );

  // Mock bemBlock() to manage CSS classes.
  props.bemBlock.mockImplementation(() => {
    return {
      mix: jest.fn().mockImplementation(classes => {
        return {
          state: jest.fn().mockImplementation(() => {
            return `sk-reset-filters ${classes}`;
          })
        };
      })
    };
  });

  const enzymeWrapper = shallow(<Reset {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Reset component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const reset = enzymeWrapper.find('.sk-reset-filters');
    expect(reset.exists()).toBe(true);
  });

  it('should reset filters if filters are active', () => {
    const { props, enzymeWrapper } = setup({
      hasFilters: true
    });
    expect(props.resetFilters).not.toHaveBeenCalled();
    enzymeWrapper.find('.sk-reset-filters').simulate('click');
    expect(props.resetFilters).toHaveBeenCalled();
  });

  it('should not reset filters if no filters are active', () => {
    const { props, enzymeWrapper } = setup({
      hasFilters: false
    });
    expect(props.resetFilters).not.toHaveBeenCalled();
    enzymeWrapper.find('.sk-reset-filters').simulate('click');
    expect(props.resetFilters).not.toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const { props } = setup();
    expect(
      mapStateToProps({
        routing: {
          locationBeforeTransitions: {
            pathname: props.pathname
          }
        }
      })
    ).toEqual({
      pathname: props.pathname
    });
  });
});
