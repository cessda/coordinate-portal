import * as _ from 'lodash';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mapStateToProps, SearchPage } from '../../src/containers/SearchPage';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render container for test.
function setup(props) {
  props = _.extend(
    {
      showMobileFilters: false,
      filters: {},
      results: 0
    },
    props || {}
  );
  const enzymeWrapper = shallow(<SearchPage {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('SearchPage container', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const searchPage = enzymeWrapper.find('SearchkitProvider');
    expect(searchPage.exists()).toBe(true);
  });

  it('should auto expand filter panels if filter active', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      filters: {
        'classifications.term': ['Term']
      }
    });
    const searchPage = enzymeWrapper.find('SearchkitProvider');
    expect(searchPage.exists()).toBe(true);
  });

  it('should apply class when mobile filters visible', () => {
    const { enzymeWrapper } = setup({
      showMobileFilters: true
    });
    expect(enzymeWrapper.find('.show-mobile-filters').exists()).toBe(true);
  });

  it('should map state to props', () => {
    const { props } = setup();
    expect(
      mapStateToProps({
        search: {
          showMobileFilters: props.showMobileFilters,
          state: props.filters,
          displayed: []
        }
      })
    ).toEqual({
      showMobileFilters: props.showMobileFilters,
      filters: props.filters,
      results: props.results
    });
  });
});
