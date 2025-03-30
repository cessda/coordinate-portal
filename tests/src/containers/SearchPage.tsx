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

import '../../mocks/reacti18nMock';
import React from "react";
import { fireEvent } from "@testing-library/react";
import { render, screen, waitFor, within } from "../../testutils";
import userEvent from '@testing-library/user-event';
import { useSearchParams, useNavigation } from "react-router-dom";
import SearchPage from "../../../src/containers/SearchPage";
import { ThematicView, thematicViews, esIndex } from "../../../src/utilities/thematicViews";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";
import '@testing-library/jest-dom';
import { SortByItem } from 'instantsearch.js/es/connectors/sort-by/connectSortBy';
import reducer from "../../../src/reducers/thematicView";

// Mock the react-instantsearch components
jest.mock("react-instantsearch", () => ({
  Hits: jest.fn(() => <div>Mocked Hits</div>),
  RefinementList: jest.fn(() => <div>Mocked RefinementList</div>),
  ClearRefinements: jest.fn(() => <button>Mocked Clear Refinements</button>),
  CurrentRefinements: jest.fn(() => <button>Mocked Current Refinements</button>),
  Stats: jest.fn(() => <div>Mocked Stats</div>),
  HitsPerPage: jest.fn(() => <div>Mocked HitsPerPage</div>),
  SortBy: jest.fn(({ items, ...props }) => (
    <select onChange={props.onChange}>
      {items.map((item: SortByItem) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )),
  Pagination: jest.fn(() => <div>Mocked Pagination</div>),
  useCurrentRefinements: jest.fn(() => ({
    items: ['keywords', 'country'],
  })),
  useClearRefinements: jest.fn(() => ({})),
  usePagination: jest.fn(() => ({})),
  useSearchBox: jest.fn(() => ({})),
  useInstantSearch: jest.fn(() => ({})),
  RangeInput: jest.fn(() => <div>Mocked RangeInput</div>),
}));

// Mock react-router-dom module
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
  useLocation: () => ({
    pathname: "/",
    key: "mockKey",
  }),
}));

// Mock the redux hooks
jest.mock("../../../src/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
const initialView = thematicViews.find((tv) => tv.path === "/") as ThematicView;
const initialIndex =  initialView.esIndexes.find((i) => i.indexName === initialView.defaultIndex ) as esIndex;
describe("SearchPage", () => {
  beforeEach(() => {
    // Mock the necessary Redux state
     // Mock the necessary Redux state
     (useAppSelector as jest.Mock).mockImplementation((callback) =>
      callback({
        thematicView: {
          currentThematicView: initialView,
          currentIndex: initialIndex
        },
        search: { 
          showFilterSummary: false,
          showMobileFilters: false 
        },
      })
    );
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockSetSearchParams = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([
      {
        get: jest.fn((key) => {
          if (key === 'sortBy') {
            return 'coordinate_en_title_asc';
          }
          return null;
        }),
      },
      mockSetSearchParams,
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render SearchPage correctly", async () => {
    render(<SearchPage />);

    // Check that the mocked components are rendered
    //expect(screen.getByText("Mocked Hits")).toBeInTheDocument();
    //expect(screen.getByText("Mocked Clear Refinements")).toBeInTheDocument();
    //expect(screen.getByText("Mocked Stats")).toBeInTheDocument();
    //expect(screen.getByText("Mocked HitsPerPage")).toBeInTheDocument();
    const paginations = screen.getAllByText(/Mocked Pagination/i);
    // Check that the correct number of Pagination is rendered
    expect(paginations).toHaveLength(2);
    const refinementLists = screen.getAllByText(/Mocked RefinementList/i);
    // Check that the correct number of RefinementList is rendered
    expect(refinementLists).toHaveLength(6);
  });

  it('should return the initial Thematic View state', () => {
     
    expect(reducer(undefined, { type: 'unknown' })).toEqual(
        { 
            currentIndex: initialIndex,
            list: thematicViews,
            currentThematicView: initialView,
             }
      )
});

  it("should handle mobile filter toggle", async () => {
    render(<SearchPage />);

    const filterButton = screen.getByText("showFilters");
    await userEvent.click(filterButton);

    expect(mockDispatch).toHaveBeenCalledWith({"payload": false, "type": "search/toggleMobileFilters"});
  });

  it("should handle filter summary toggle with enter", async () => {
    render(<SearchPage />);

    const toggleSummaryButton = screen.getByText('filters.summary.label');
    toggleSummaryButton.focus();
    await userEvent.keyboard('{Enter}');
  
    expect(mockDispatch).toHaveBeenCalledWith({"payload": false, "type": "search/toggleSummary"});
  });

  
/*
  it("should be able to show and then close filter summary", async () => {
    let showFilterSummary = true;
    (useAppSelector as jest.Mock).mockImplementation((callback) =>
      callback({
        thematicView: {
          currentThematicView: initialView,
          currentIndex: initialIndex
        },
        search: { 
          showFilterSummary: false,
          showMobileFilters: false 
        },
      })
    );
    
    const { rerender } = render(<SearchPage />);
  
    expect(screen.getByTestId('filter-summary')).toBeInTheDocument();
    expect(screen.getByText("Mocked Current Refinements")).toBeInTheDocument();

    showFilterSummary = false;

    const closeFilterSummaryButton = screen.getByTestId("close-filter-summary");
    await userEvent.click(closeFilterSummaryButton);

    expect(mockDispatch).toHaveBeenCalledWith({"payload": true, "type": "search/toggleSummary"});

    rerender(<SearchPage />);

    expect(screen.queryByTestId('filter-summary')).toBe(null);
    expect(screen.queryByText("Mocked Current Refinements")).toBe(null);
  });


  it('should dispatch updateLanguage action on sort by change', () => {
    render(<SearchPage />);


    const sortByDropdown = screen.getByTestId('sortby-options');
    fireEvent.change(sortByDropdown, { target: { value: 'cmmstudy_en_title_asc' } });
    
    expect(mockDispatch).toHaveBeenCalledWith(updateThematicView(initialView));
  });
  */


});
