import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { SortingSelector } from '../../src/components/SortingSelector';
import searchkit from '../../src/utilities/searchkit';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup() {
  const props = {
    searchkit: searchkit,
    options: [
      {
        translation: 'sorting.relevance',
        key: 'relevance',
        field: '_score',
        order: 'desc',
        defaultOption: true
      },
      {
        translation: 'sorting.titleAscending',
        key: 'title-ascending',
        field: 'titleStudy.raw',
        order: 'asc'
      },
      {
        translation: 'sorting.titleDescending',
        key: 'title-descending',
        field: 'titleStudy.raw',
        order: 'desc'
      },
      {
        translation: 'sorting.dateAscending',
        key: 'date-ascending',
        field: 'dataCollectionPeriodStartdate',
        order: 'asc'
      },
      {
        translation: 'sorting.dateDescending',
        key: 'date-descending',
        field: 'dataCollectionPeriodStartdate',
        order: 'desc'
      }
    ]
  };
  const enzymeWrapper = shallow(<SortingSelector {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('SortingSelector component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should handle has hits', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.instance().hasHits()).toBe(true);
  });
});