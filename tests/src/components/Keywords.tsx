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
    let promise: Promise<TermURIResult> = Promise.resolve({});

    // Mock implementation of getELSSTTerm()
    (getELSSTTerm as jest.MockedFn<typeof getELSSTTerm>).mockImplementation((labels) => {
      const destObject: TermURIResult = {};

      // Provide an ELSST link for each term
      labels.forEach(l => destObject[l] = `https://elsst.cessda.eu/test/${l}`);

      // The test needs to wait for the promise to be resolved
      promise = Promise.resolve(destObject);

      return promise;
    });

    const keywords = ["1", "2", "3", "4"];

    const { enzymeWrapper, props } = setup({
      keywords: keywords.map(t => getKeyword(t))
    });

    // Wait for the sta
    await promise;

    // When rendering the component should have requested ELSST terms for the keywords
    expect(getELSSTTerm).toHaveBeenCalledWith(keywords, props.lang);

    // The terms should link to ELSST
    const tagChildren = enzymeWrapper.find(".tag").children();
    expect((tagChildren.get(0).props.href as string).includes("https://elsst.cessda.eu/test/")).toEqual(true);
  });
});
