import * as _ from 'lodash';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mapDispatchToProps, mapStateToProps, Panel } from '../../src/components/Panel';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup(props) {
  props = _.extend(
    {
      tooltip: {},
      defaultCollapsed: false,
      linkCollapsedState: false,
      expandMetadataPanels: false,
      toggleMetadataPanels: jest.fn()
    },
    props || {}
  );

  // Mock toggleMetadataPanels() to update expanded state.
  props.toggleMetadataPanels.mockImplementation(() => {
    props.expandMetadataPanels = !props.expandMetadataPanels;
  });

  const enzymeWrapper = shallow(<Panel {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Panel component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const panel = enzymeWrapper.find('.sk-panel__container');
    expect(panel.exists()).toBe(true);
  });

  it('should refresh metadata panels state on update when linking collapsed state', () => {
    const { props, enzymeWrapper } = setup({
      linkCollapsedState: true,
      defaultCollapsed: false,
      expandMetadataPanels: true
    });
    expect(props.expandMetadataPanels).toBe(true);
    enzymeWrapper.setProps({
      expandMetadataPanels: false
    });
    expect(props.expandMetadataPanels).toBe(true);
  });

  it('should not refresh metadata panels state on update when not linking collapsed state', () => {
    const { props, enzymeWrapper } = setup({
      linkCollapsedState: false,
      defaultCollapsed: false,
      expandMetadataPanels: true
    });
    expect(props.expandMetadataPanels).toBe(true);
    enzymeWrapper.setProps({
      expandMetadataPanels: true
    });
    expect(props.expandMetadataPanels).toBe(true);
  });

  it('should handle toggle collapsed when linking collapsed state', () => {
    const { props, enzymeWrapper } = setup({
      linkCollapsedState: true
    });
    expect(props.expandMetadataPanels).toBe(false);
    enzymeWrapper.instance().toggleCollapsed();
    expect(props.expandMetadataPanels).toBe(true);
  });

  it('should handle toggle collapsed when not linking collapsed state', () => {
    const { props, enzymeWrapper } = setup({
      linkCollapsedState: false
    });
    expect(props.expandMetadataPanels).toBe(false);
    enzymeWrapper.instance().toggleCollapsed();
    expect(props.expandMetadataPanels).toBe(false);
  });

  it('should map state to props', () => {
    const { props } = setup();
    expect(
      mapStateToProps({
        search: {
          expandMetadataPanels: props.expandMetadataPanels
        }
      })
    ).toEqual({
      expandMetadataPanels: props.expandMetadataPanels
    });
  });

  it('should map dispatch to props', () => {
    expect(mapDispatchToProps()).toEqual({
      toggleMetadataPanels: expect.any(Function)
    });
  });
});
