import * as _ from 'lodash';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mapDispatchToProps, mapStateToProps, SearchBox } from '../../src/components/SearchBox';
import searchkit from '../../src/utilities/searchkit';
import { detect } from 'detect-browser';

// Mock detect() in detect-browser module.
jest.mock('detect-browser', () => ({
  detect: jest.fn()
}));

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup(props, browser) {
  props = _.extend(
    {
      searchkit: searchkit,
      pathname: '/',
      push: jest.fn(),
      query: 'search text'
    },
    props || {}
  );

  // Mock detect-browser detect() to return custom browser type.
  detect.mockImplementation(() => {
    return {
      name: browser || 'chrome'
    };
  });

  const enzymeWrapper = shallow(<SearchBox {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('SearchBox component', () => {
  afterEach(() => {
    // Only a single instance of BaseQueryAccessor is allowed so remove existing.
    searchkit.removeAccessor(searchkit.getQueryAccessor());
  });

  it('should render', () => {
    const { enzymeWrapper } = setup();
    const searchBox = enzymeWrapper.find('.sk-search-box');
    expect(searchBox.exists()).toBe(true);
  });

  it('should handle on change with queries over 250 characters', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.instance().onChange({
      target: {
        value:
          'Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque.'
      }
    });
    expect(props.push).not.toHaveBeenCalled();
  });

  it('should handle on change when on search page', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.instance().onChange({
      target: {
        value: props.query
      }
    });
    expect(props.push).not.toHaveBeenCalled();
  });

  it('should handle on change when on detail page', () => {
    const { props, enzymeWrapper } = setup({
      pathname: '/detail'
    });
    enzymeWrapper.instance().onChange({
      target: {
        value: props.query
      }
    });
    expect(props.push).toHaveBeenCalled();
  });

  it('should handle on change when on detail page using IE', () => {
    const { props, enzymeWrapper } = setup(
      {
        pathname: '/detail'
      },
      'ie'
    );
    enzymeWrapper.instance().onChange({
      target: {
        value: props.query
      }
    });
    expect(props.push).not.toHaveBeenCalled();
  });

  it('should handle on change when on detail page using IE and apply workaround', () => {
    const { props, enzymeWrapper } = setup(
      {
        pathname: '/detail'
      },
      'ie'
    );
    enzymeWrapper.instance().onChange({
      target: {
        value: 'query'
      }
    });
    expect(props.push).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const { props } = setup();
    expect(
      mapStateToProps({
        routing: {
          locationBeforeTransitions: {
            pathname: props.pathname
          }
        },
        search: {
          state: {
            q: props.query
          }
        }
      })
    ).toEqual({
      pathname: props.pathname,
      query: props.query
    });
  });

  it('should map dispatch to props', () => {
    expect(mapDispatchToProps()).toEqual({
      push: expect.any(Function)
    });
  });
});
