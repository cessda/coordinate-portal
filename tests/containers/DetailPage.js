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
import { DetailPage, mapDispatchToProps, mapStateToProps } from '../../src/containers/DetailPage';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render container for test.
function setup(props) {
  props = _.extend(
    {
      loading: false,
      item: {
        id: 1,
        studyUrl: 'http://example.com'
      },
      jsonLd: {},
      code: 'en',
      list: [
        {
          code: 'en',
          label: 'English',
          index: 'cmmstudy_en'
        }
      ],
      query: {},
      goBack: jest.fn()
    },
    props || {}
  );
  const enzymeWrapper = shallow(<DetailPage {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('DetailPage container', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const detailPage = enzymeWrapper.find('SearchkitProvider');
    expect(detailPage.exists()).toBe(true);
  });

  it('should handle not finding language code for index', () => {
    const { enzymeWrapper } = setup({
      code: 'fi'
    });
    expect(
      enzymeWrapper
        .find('.button')
        .at(2)
        .prop('href')
    ).toBe('/api/json/undefined/1');
  });

  it('should show message when study not found', () => {
    const { enzymeWrapper } = setup({
      item: undefined
    });
    expect(enzymeWrapper.find('.panel.pt-15').exists()).toBe(true);
  });

  it('should map state to props with displayed item', () => {
    const { props } = setup();
    expect(
      mapStateToProps({
        routing: {
          locationBeforeTransitions: {
            query: props.query
          }
        },
        language: {
          code: props.code,
          list: props.list
        },
        search: {
          loading: props.loading,
          displayed: [props.item],
          jsonLd: props.jsonLd
        }
      })
    ).toEqual({
      loading: props.loading,
      item: props.item,
      jsonLd: props.jsonLd,
      code: props.code,
      list: props.list,
      query: props.query
    });
  });

  it('should map state to props with missing item', () => {
    const { props } = setup();
    expect(
      mapStateToProps({
        routing: {
          locationBeforeTransitions: {
            query: props.query
          }
        },
        language: {
          code: props.code,
          list: props.list
        },
        search: {
          loading: props.loading,
          displayed: [],
          jsonLd: props.jsonLd
        }
      })
    ).toEqual({
      loading: props.loading,
      item: undefined,
      jsonLd: props.jsonLd,
      code: props.code,
      list: props.list,
      query: props.query
    });
  });

  it('should map dispatch to props', () => {
    expect(mapDispatchToProps()).toEqual({
      goBack: expect.any(Function)
    });
  });
});
