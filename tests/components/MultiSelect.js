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

import * as _ from 'lodash';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { MultiSelect } from '../../src/components/MultiSelect';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup(props) {
  props = _.extend(
    {
      placeholder: '',
      items: [
        {
          label: 'Label',
          key: 'Key',
          value: 'Value',
          doc_count: 2
        },
        {
          key: 'Key',
          value: 'Value',
          doc_count: 2
        }
      ],
      selectedItems: undefined,
      disabled: false,
      showCount: false,
      setItems: jest.fn()
    },
    props || {}
  );

  // Mock setItems() to update selected items.
  props.setItems.mockImplementation(items => {
    props.selectedItems = items;
  });

  const enzymeWrapper = shallow(<MultiSelect {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('MultiSelect component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const select = enzymeWrapper.find('Select');
    expect(select.exists()).toBe(true);
  });

  it('should populate options', () => {
    const { props, enzymeWrapper } = setup();
    const options = enzymeWrapper.find('Select').prop('options');
    expect(options.length).toBe(props.items.length);
  });

  it('should show option counts when enabled', () => {
    const { props, enzymeWrapper } = setup({
      showCount: true
    });
    const options = enzymeWrapper.find('Select').prop('options');
    expect(options[0].label).toBe(
      `${props.items[0].label} (${props.items.length}) `
    );
  });

  it('should hide option counts when disabled', () => {
    const { props, enzymeWrapper } = setup({
      showCount: false
    });
    const options = enzymeWrapper.find('Select').prop('options');
    expect(options[0].label).toBe(props.items[0].label);
  });

  it('should handle change with parameter', () => {
    const { props, enzymeWrapper } = setup();
    expect((props.selectedItems || []).length).toBe(0);
    enzymeWrapper.instance().handleChange(props.items);
    expect((props.selectedItems || []).length).toBe(2);
  });

  it('should handle change without parameter', () => {
    const { props, enzymeWrapper } = setup();
    expect((props.selectedItems || []).length).toBe(0);
    enzymeWrapper.instance().handleChange();
    expect((props.selectedItems || []).length).toBe(0);
  });

  it('should render value', () => {
    const { props, enzymeWrapper } = setup();
    expect(enzymeWrapper.instance().renderValue(props.items[0])).toBe(
      props.items[0].label
    );
  });
});
