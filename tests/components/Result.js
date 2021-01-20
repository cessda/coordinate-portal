// Copyright CESSDA ERIC 2017-2019
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

import * as _ from 'lodash';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  mapDispatchToProps,
  mapStateToProps,
  Result
} from '../../src/components/Result';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup(item) {
  const props = {
    bemBlocks: {
      container: jest.fn(),
      item: jest.fn()
    },
    code: 'en',
    index: 0,
    item:
      item === false
        ? undefined
        : _.extend(
            {
              id: 1,
              titleStudy: 'Study Title',
              abstract:
                "Long Abstract.\nAipiscing elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus.",
              abstractExpanded: false,
              abstractShort: 'Short Abstract',
              abstractHighlight: 'Long Abstract highlighted',
              abstractHighlightShort: 'Short abstract highlighted',
              creators: [
                'Jane Doe',
                'University of Essex',
                'John Smith (University of Essex)'
              ],
              langAvailableIn: ['EN'],
              studyUrl: 'http://example.com'
            },
            item || {}
          ),
    push: jest.fn(),
    changeLanguage: jest.fn(),
    toggleLongAbstract: jest.fn()
  };

  // Mock bemBlocks.container() to manage CSS classes.
  props.bemBlocks.container.mockImplementation(classes => {
    return `sk-hits-list__${classes}`;
  });

  // Mock bemBlocks.item() to manage CSS classes.
  props.bemBlocks.item.mockImplementation(() => {
    return {
      mix: jest.fn().mockImplementation(classes => {
        return classes;
      })
    };
  });

  // Mock toggleLongAbstract() to update long abstract visibility.
  props.toggleLongAbstract.mockImplementation(() => {
    props.item.abstractExpanded = !props.item.abstractExpanded;
  });

  const enzymeWrapper = shallow(<Result {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Result component', () => {
  it('should render with supplied item', () => {
    const { enzymeWrapper } = setup();
    const result = enzymeWrapper.find('.list_hit');
    expect(result.exists()).toBe(true);
  });

  it('should not render with undefined item', () => {
    const { enzymeWrapper } = setup(false);
    const result = enzymeWrapper.find('.list_hit');
    expect(result.exists()).toBe(false);
  });

  it('should truncate number of creators displayed', () => {
    const { enzymeWrapper } = setup({
      creators: [
        'Jane Doe',
        'University of Essex',
        'John Smith (University of Essex)',
        'Joe Bloggs, University of Essex'
      ]
    });
    expect(enzymeWrapper.find('.sk-hits-list__meta').text()).toContain(
      '(1 more)'
    );
  });

  it('should show long abstract if expanded', () => {
    const { enzymeWrapper } = setup({
      abstractExpanded: true
    });
    expect(
      enzymeWrapper.find('.sk-hits-list__desc span').length
    ).toBeGreaterThan(0);
  });

  it('should hide long abstract if not expanded', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('.sk-hits-list__desc span.abstr').length).toBe(0);
  });

  it('should toggle long abstract', () => {
    const { props, enzymeWrapper } = setup();
    expect(props.item.abstractExpanded).toBe(false);
    enzymeWrapper
      .find('.button')
      .at(0)
      .simulate('click');
    expect(props.item.abstractExpanded).toBe(true);
  });

  it('should change language', () => {
    const { props, enzymeWrapper } = setup();
    expect(props.changeLanguage).not.toHaveBeenCalled();
    expect(props.push).not.toHaveBeenCalled();
    enzymeWrapper
      .find('.button')
      .at(2)
      .simulate('click');
    expect(props.changeLanguage).toHaveBeenCalled();
    expect(props.push).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const { props } = setup();
    expect(
      mapStateToProps(
        {
          search: {
            displayed: [props.item]
          }
        },
        props
      )
    ).toEqual({
      item: props.item
    });
  });

  it('should map dispatch to props', () => {
    expect(mapDispatchToProps()).toEqual({
      push: expect.any(Function),
      changeLanguage: expect.any(Function),
      toggleLongAbstract: expect.any(Function)
    });
  });
});
