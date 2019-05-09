import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { RefinementListFilter } from '../../src/components/RefinementListFilter';
import searchkit from '../../src/utilities/searchkit';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup() {
  const props = {
    searchkit: searchkit,
    id: 'id',
    field: 'field'
  };
  const enzymeWrapper = shallow(<RefinementListFilter {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('RefinementListFilter component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
