// Copyright CESSDA ERIC 2017-2021
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';
import { shallow } from 'enzyme';
import { mapStateToProps, Reset } from '../../src/components/Reset';
import _ from 'lodash';

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
