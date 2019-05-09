import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Footer } from '../../src/components/Footer';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup() {
  const props = {};
  const enzymeWrapper = shallow(<Footer {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Footer component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const footer = enzymeWrapper.find('footer');

    expect(footer.exists()).toBe(true);
  });

  it('should include logo', () => {
    const { enzymeWrapper } = setup();
    const logo = enzymeWrapper.find('.logo-footer');

    expect(logo.exists()).toBe(true);
  });

  it('should generate script with JSON-LD for organisation', () => {
    const { enzymeWrapper } = setup();
    const script = enzymeWrapper.find('script');

    expect(script.prop('type')).toEqual('application/ld+json');

    expect(JSON.parse(script.text())).toEqual({
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: 'CESSDA ERIC',
      url: 'https://www.cessda.eu',
      sameAs: [
        'https://twitter.com/CESSDA_Data',
        'https://www.facebook.com/Cessda-463858013634628',
        'https://www.instagram.com/cessda_data',
        'https://www.linkedin.com/company/9392869',
        'https://plus.google.com/112779581489694492154',
        'https://www.youtube.com/channel/UCqbZKb1Enh-WcFpg6t86wsA'
      ]
    });
  });
});
