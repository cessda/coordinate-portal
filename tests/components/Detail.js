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
  Detail,
  mapDispatchToProps,
  mapStateToProps
} from '../../src/components/Detail';

Enzyme.configure({ adapter: new Adapter() });

// Mock props and shallow render component for test.
function setup(item) {
  const props = {
    bemBlocks: jest.fn(),
    index: 0,
    item:
      item === false
        ? undefined
        : _.extend(
            {
              id: 1,
              titleStudy: 'Study Title',
              abstract: 'Abstract',
              abstractExpanded: false,
              abstractShort: 'Abstract',
              classifications: [
                {
                  id: 'UKDS1234',
                  term: 'Term',
                  vocab: 'Vocab',
                  vocabUri: 'http://example.com'
                }
              ],
              creators: [
                'Jane Doe',
                'University of Essex',
                'John Smith (University of Essex)',
                'Joe Bloggs, University of Essex'
              ],
              dataAccessFreeTexts: ['Data Access Free Texts'],
              dataCollectionFreeTexts: [],
              dataCollectionPeriodEnddate: '',
              dataCollectionPeriodStartdate: '2001',
              fileLanguages: ['en'],
              isActive: true,
              keywords: [
                {
                  id: 'UKDS1234',
                  term: 'Term',
                  vocab: 'Vocab',
                  vocabUri: 'http://example.com'
                }
              ],
              langAvailableIn: ['EN'],
              lastModified: '2001-01-01T12:00:00Z',
              pidStudies: [
                {
                  agency: 'UKDS',
                  pid: 'UKDS1234'
                }
              ],
              publicationYear: '2001-01-01',
              publisher: 'UK Data Service',
              samplingProcedureFreeTexts: [],
              studyAreaCountries: [
                {
                  abbr: 'EN',
                  country: 'England'
                }
              ],
              studyNumber: 'UKDS1234',
              studyUrl: 'http://example.com',
              typeOfModeOfCollections: [
                {
                  id: 'UKDS1234',
                  term: 'Term',
                  vocab: 'Vocab',
                  vocabUri: 'http://example.com'
                }
              ],
              typeOfTimeMethods: [
                {
                  id: 'UKDS1234',
                  term: 'Term',
                  vocab: 'Vocab',
                  vocabUri: 'http://example.com'
                }
              ],
              unitTypes: [
                {
                  id: 'UKDS1234',
                  term: 'Term',
                  vocab: 'Vocab',
                  vocabUri: 'http://example.com'
                }
              ]
            },
            item || {}
          ),
    expandMetadataPanels: true,
    toggleMetadataPanels: jest.fn()
  };

  // Mock toggleMetadataPanels() to update state.
  props.toggleMetadataPanels.mockImplementation(() => {
    props.expandMetadataPanels = !props.expandMetadataPanels;
  });

  const enzymeWrapper = shallow(<Detail {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Detail component', () => {
  it('should render with supplied item', () => {
    const { enzymeWrapper } = setup();
    const detail = enzymeWrapper.find('div.w-100');
    expect(detail.exists()).toBe(true);
  });

  it('should not render with undefined item', () => {
    const { enzymeWrapper } = setup(false);
    const detail = enzymeWrapper.find('div.w-100');
    expect(detail.exists()).toBe(false);
  });

  it('should handle no pidStudies provided', () => {
    const { enzymeWrapper } = setup({
      pidStudies: []
    });
    const detail = enzymeWrapper.find('div.w-100');
    expect(detail.exists()).toBe(true);
  });

  it('should handle no title provided', () => {
    const { enzymeWrapper } = setup({
      titleStudy: undefined
    });
    const detail = enzymeWrapper.find('div.w-100');
    expect(detail.exists()).toBe(true);
  });

  it('should handle no publisher provided', () => {
    const { enzymeWrapper } = setup({
      publisher: undefined
    });
    const detail = enzymeWrapper.find('div.w-100');
    expect(detail.exists()).toBe(true);
  });

  it('should handle no study number provided', () => {
    const { enzymeWrapper } = setup({
      studyNumber: undefined
    });
    const detail = enzymeWrapper.find('div.w-100');
    expect(detail.exists()).toBe(true);
  });

  it('should handle generating elements with no value', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(enzymeWrapper.instance().generateElements([{}])[0]).html()
    ).toContain('notAvailable');
  });

  it('should handle formatting dates with missing data', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(enzymeWrapper.instance().formatDate('DD/MM/YYYY')).html()
    ).toContain('notAvailable');
  });

  it('should handle formatting dates with fallback array containing date range', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(
        enzymeWrapper.instance().formatDate(
          'DD/MM/YYYY',
          null,
          null,
          [
            {
              dataCollectionFreeText: '2003-02-01',
              event: 'start'
            },
            {
              dataCollectionFreeText: '2006-05-04',
              event: 'end'
            }
          ],
          'dataCollectionFreeText'
        )
      )
        .find('p')
        .text()
    ).toBe('01/02/2003 - 04/05/2006');
  });

  it('should handle formatting dates with fallback array containing valid date', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(
        enzymeWrapper
          .instance()
          .formatDate('DD/MM/YYYY', null, null, ['2003-02-01'])[0]
      )
        .find('p')
        .text()
    ).toBe('01/02/2003');
  });

  it('should handle formatting dates with fallback array containing random data', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(
        enzymeWrapper
          .instance()
          .formatDate('DD/MM/YYYY', null, null, ['Fallback'])[0]
      )
        .find('p')
        .text()
    ).toBe('Fallback');
  });

  it('should handle formatting dates with fallback string', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(
        enzymeWrapper
          .instance()
          .formatDate('DD/MM/YYYY', null, null, 'Fallback')
      )
        .find('p')
        .text()
    ).toBe('Fallback');
  });

  it('should handle formatting dates with invalid first date', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(enzymeWrapper.instance().formatDate('DD/MM/YYYY', 'Not a date'))
        .find('p')
        .text()
    ).toBe('Not a date');
  });

  it('should handle formatting dates as a range with invalid first date', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(
        enzymeWrapper
          .instance()
          .formatDate('DD/MM/YYYY', 'Not a date', '2006-05-04')
      )
        .find('p')
        .text()
    ).toBe('Not a date - 04/05/2006');
  });

  it('should handle formatting dates as a range with valid second date', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(
        enzymeWrapper
          .instance()
          .formatDate('DD/MM/YYYY', '2003-02-01', '2006-05-04')
      )
        .find('p')
        .text()
    ).toBe('01/02/2003 - 04/05/2006');
  });

  it('should handle formatting dates as a range with invalid second date', () => {
    const { enzymeWrapper } = setup();
    expect(
      shallow(
        enzymeWrapper
          .instance()
          .formatDate('DD/MM/YYYY', '2003-02-01', 'Not a date')
      )
        .find('p')
        .text()
    ).toBe('01/02/2003 - Not a date');
  });

  it('should reset metadata panels state on unmount if expanded', () => {
    const { props, enzymeWrapper } = setup();
    expect(props.expandMetadataPanels).toBe(true);
    enzymeWrapper.unmount();
    expect(props.expandMetadataPanels).toBe(false);
    expect(props.toggleMetadataPanels).toHaveBeenCalled();
  });

  it('should not reset metadata panels state on unmount if not expanded', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      expandMetadataPanels: false
    });
    enzymeWrapper.unmount();
    expect(props.toggleMetadataPanels).not.toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const { props } = setup();
    expect(
      mapStateToProps(
        {
          search: {
            displayed: [props.item],
            expandMetadataPanels: props.expandMetadataPanels
          }
        },
        props
      )
    ).toEqual({
      item: props.item,
      expandMetadataPanels: props.expandMetadataPanels
    });
  });

  it('should map dispatch to props', () => {
    expect(mapDispatchToProps()).toEqual({
      toggleMetadataPanels: expect.any(Function)
    });
  });
});
