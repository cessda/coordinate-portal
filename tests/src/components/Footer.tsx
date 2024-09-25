// Copyright CESSDA ERIC 2017-2024
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
import Footer from '../../../src/components/Footer';
import { render } from '../../testutils';

// Mock props and shallow render component for test.
function setup() {
  const props = {};
  const renderResult = render(<Footer {...props} />);
  return {
    props,
    renderResult: renderResult
  };
}

describe('Footer component', () => {
  it('should render', () => {
    const { renderResult: renderResult } = setup();
    const footer = renderResult.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('should generate script with JSON-LD for CESSDA', () => {
    const { renderResult: renderResult } = setup();
    const script = renderResult.getByTestId('cessdaJson');

    expect(script.getAttribute('type')).toEqual('application/ld+json');

    expect(script.textContent).not.toBe(null);
    expect(JSON.parse(script.textContent as string)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CESSDA ERIC',
      url: 'https://www.cessda.eu',
      sameAs: [
        'https://twitter.com/CESSDA_Data',
        'https://www.linkedin.com/company/9392869',
        'https://www.youtube.com/channel/UCqbZKb1Enh-WcFpg6t86wsA'
      ]
    });
  });

  it('should generate script with JSON-LD for COORDINATE', () => {
    const { renderResult: renderResult } = setup();
    const script = renderResult.getByTestId('coordinateJson');

    expect(script.getAttribute('type')).toEqual('application/ld+json');

    expect(script.textContent).not.toBe(null);
    expect(JSON.parse(script.textContent as string)).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "COORDINATE",
      url: "https://www.coordinate-network.eu/",
      sameAs: [
        "https://twitter.com/coordinate_eu",
        "https://www.youtube.com/channel/UCjQ4Kv4VPn449d80-CIGJZQ",
      ],
    });
  });
});
