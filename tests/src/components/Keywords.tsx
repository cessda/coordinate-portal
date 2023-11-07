// Copyright CESSDA ERIC 2017-2023
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
import { shallow } from 'enzyme';
import Keywords, { Props } from '../../../src/components/Keywords';
import { TermVocabAttributes } from '../../../common/metadata';
import { getELSSTTerm } from '../../../src/utilities/elsst';
import { TermURIResult } from '../../../server/elsst';

// Mock out the module that sends requests to the server
jest.mock('../../../src/utilities/elsst.ts', () => {
  return {
    __esModule: true,
    getELSSTTerm: jest.fn(() => Promise.resolve({}))
  }
});

// Mock props and shallow render component for test.
function setup(providedProps: Partial<Props> = {}) {
  const props: Props = {
    keywords: [],
    lang: "en",
    ...providedProps
  };
  const enzymeWrapper = shallow(<Keywords {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

function getKeyword(term: string): TermVocabAttributes {
  return {
    term: term,
    vocab: "",
    vocabUri: "",
    id: ""
  }
}

describe('Keywords component', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    const tagContainer = enzymeWrapper.find(".tags");
    expect(tagContainer.exists()).toBe(true);
  });

  it('should render keywords', () => {
    const keywords = ["1", "2", "3", "4"];

    const { enzymeWrapper, props } = setup({
      keywords: keywords.map(t => getKeyword(t))
    });

    // Find all tag elements
    const tagElements = enzymeWrapper.find(".tag");

    // There should be 4 keywords
    expect(tagElements).toHaveLength(4);

    // When rendering the component should have requested ELSST terms for the keywords
    expect(getELSSTTerm).toHaveBeenCalledWith(keywords, props.lang);
  });

  it('should update keywords', () => {
    const keywords = ["1", "2", "3", "4"];

    const { enzymeWrapper, props } = setup({
      keywords: keywords.map(t => getKeyword(t))
    });

    // When rendering the component should have requested ELSST terms for the keywords
    expect(getELSSTTerm).toHaveBeenCalledWith(keywords, props.lang);

    // Update keywords
    const newKeywords = ["5", "6", "7", "8"];
    enzymeWrapper.setProps({ keywords: newKeywords.map(t => getKeyword(t)) })

    // ELSST terms should be requested for the new keywords
    expect(getELSSTTerm).toHaveBeenCalledWith(newKeywords, props.lang);
  });

  it('should link ELSST terms', async () => {
    const linkELSST = "https://elsst.cessda.eu/test/";

    let promise: Promise<TermURIResult> = Promise.resolve({});

    // Mock implementation of getELSSTTerm()
    (getELSSTTerm as jest.MockedFn<typeof getELSSTTerm>).mockImplementation((labels) => {
      const destObject: TermURIResult = {};

      // Provide an ELSST link for each term, except when l is 3 to test term not having a link
      labels.forEach(l => {
        if (l !== "3") {
          destObject[l] = `${linkELSST}${l}`;
        }
      });

      // The test needs to wait for the promise to be resolved
      promise = Promise.resolve(destObject);

      return promise;
    });

    const keywords = ["1", "2", "3", "4"];

    const { enzymeWrapper, props } = setup({
      keywords: keywords.map(t => getKeyword(t))
    });

    // Wait for the promise to be resolved
    await promise;

    // When rendering the component should have requested ELSST terms for the keywords
    expect(getELSSTTerm).toHaveBeenCalledWith(keywords, props.lang);

    // The terms with ELSST link provided should link to ELSST
    const tagsELSSTFound = enzymeWrapper.find(".tag").map((tagElement) => {
      // Find link to ELLST by it opening in a new tab/window
      const linkELSSTElement = tagElement.find("a").find({ target: '_blank' });
      if (linkELSSTElement.exists() && (linkELSSTElement.prop('href') as string).includes(linkELSST)) {
        return true;
      }
      return false;
    });
    expect(tagsELSSTFound).toEqual([true, true, false, true]);
  });

  it('should toggle between showing limited number of keywords and showing all keywords', () => {
    const keywords = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

    const { enzymeWrapper, props } = setup({
      keywords: keywords.map(t => getKeyword(t))
    });

    // There should be limited number of keywords when not expanded
    expect(enzymeWrapper.state('isExpanded')).toBe(false);
    expect(enzymeWrapper.find(".tag")).toHaveLength(12);

    // All keywords should be shown when expanded
    enzymeWrapper.find('.button').at(0).simulate('click');
    expect(enzymeWrapper.state('isExpanded')).toBe(true);
    expect(enzymeWrapper.find(".tag")).toHaveLength(15);
  });
});
