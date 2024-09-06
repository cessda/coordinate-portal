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

import React from "react";
import { render, screen, } from "../../testutils";
import Result from "../../../src/components/Result";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string | number) => key,
  }),
}));

const baseMockHit = {
  objectID: "1",
  titleStudy: 'Full Study Title',
  _index: "coordinate_en",
  abstract: "Long Abstract.\nAipiscing elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus.",
  creators: [
    { name: 'Jane Doe' },
    { name: 'University of Essex' },
    { name: 'John Smith', affiliation: 'University of Essex' }
  ],
  langAvailableIn: ['en', 'fi'],
  studyUrl: 'http://example.com',
  _highlightResult: {
    abstract: {
      matchLevel: "none",
      matchedWords: [],
      value: "Long Abstract.\nAipiscing elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus."
    },
    titleStudy: {
      matchLevel: "none",
      matchedWords: [],
      value: "Full Study Title"
    }
  }
};

it('renders result with title, creators, and abstract', () => {
  render(<Result hit={baseMockHit} showAbstract={true} />);

  // Title
  expect(screen.getByText(baseMockHit.titleStudy)).toBeInTheDocument();

  // Creators
  expect(screen.getByText('Jane Doe;')).toBeInTheDocument();
  expect(screen.getByText('University of Essex;')).toBeInTheDocument();
  expect(screen.getByText('John Smith (University of Essex)')).toBeInTheDocument();

  // Abstract
  expect(screen.getByText('Long Abstract. Aipiscing elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue...')).toBeInTheDocument();
});

it('renders highlighted title', () => {
  // Modify the mockHit for this test
  const modifiedHit = {
    ...baseMockHit,
    _highlightResult: {
      abstract: {
        fullyHighlighted: false,
        matchLevel: "full",
        matchedWords: [
          "family"
        ],
        value: "and with whom they are in the afternoons, how much time they spend at home alone, and how often the __ais-highlight__family__/ais-highlight__"
      },
      titleStudy: {
        fullyHighlighted: false,
        matchLevel: "full",
        matchedWords: [
          "Family"
        ],
        value: "__ais-highlight__Family__/ais-highlight__ Barometer 2001: Children's Leisure Time"
      }
    },
  };

  render(<Result hit={modifiedHit} showAbstract={true} />);

  // Title
  expect(screen.getByText(modifiedHit._highlightResult.titleStudy.value)).toBeInTheDocument();
});

it('renders language buttons', () => {
  render(<Result hit={baseMockHit} showAbstract={true} />);

  expect(screen.getByText('en')).toBeInTheDocument();
  expect(screen.getByText('fi')).toBeInTheDocument();
});

it('renders external study link', () => {
  render(<Result hit={baseMockHit} showAbstract={true} />);

  const link = screen.getByTestId('study-url');
  expect(link).toHaveAttribute('href', 'http://example.com');
});

it('toggles abstract expansion on button click', async () => {
  render(<Result hit={baseMockHit} showAbstract={true} />);

  const expandAbstractButton = screen.getByTestId('expand-abstract');
  await userEvent.click(expandAbstractButton);

  // Expect abstract to be expanded
  expect(screen.getByText('readLess')).toBeInTheDocument();

  await userEvent.click(expandAbstractButton);

  // Expect abstract to be collapsed
  expect(screen.getByText('readMore')).toBeInTheDocument();
});

it('toggles abstract expansion on Enter or Space key', async () => {
  render(<Result hit={baseMockHit} showAbstract={true} />);

  const expandAbstractButton = screen.getByTestId('expand-abstract');
  expandAbstractButton.focus();
  await userEvent.keyboard('{Enter}');

  // Expect abstract to be expanded
  expect(screen.getByText('readLess')).toBeInTheDocument();

  await userEvent.keyboard('{ }');

  // Expect abstract to be collapsed
  expect(screen.getByText('readMore')).toBeInTheDocument();
});
