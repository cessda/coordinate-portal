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
import { render, screen } from '@testing-library/react';
import ToggleButtons from "../../../src/components/ToggleButtons";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock the redux hooks
jest.mock("../../../src/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  withTranslation: () => (Component: React.ComponentType) => (props: any) =>
    <Component t={(key: string) => key} {...props} />,
}));

describe("ToggleButtons", () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    // Create mock function for dispatch
    mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the toggle buttons and display mocked state", () => {
    render(<ToggleButtons />);

    const showAbstract = screen.getByLabelText('showAbstract');
    expect(showAbstract).toBeInTheDocument();
    const showKeywords = screen.getByLabelText('showKeywords');
    expect(showKeywords).toBeInTheDocument();
  });

  it("should dispatch action when button is clicked", async () => {
    render(<ToggleButtons />);

    // Simulate user toggling abstract
    const toggleAbstractButton = screen.getByLabelText('showAbstract');
    await userEvent.click(toggleAbstractButton);

    // Check that the dispatch function was called with a specific action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/toggleAbstract",
      payload: false
    });

    // Simulate user toggling keywords
    const toggleKeywordsButton = screen.getByLabelText('showKeywords');
    await userEvent.click(toggleKeywordsButton);

    // Check that the dispatch function was called with a specific action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "search/toggleKeywords",
      payload: false
    });
  });
});
