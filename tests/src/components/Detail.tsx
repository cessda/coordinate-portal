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
import { render, screen, waitFor, within } from "../../testutils";
import Detail, { Props } from "../../../src/components/Detail";
import { mockStudy } from "../../common/mockdata";
import userEvent from '@testing-library/user-event';

const baseProps: Props = {
  item: {
    ...mockStudy,
  },
  headings: [
    { summary: { id: 'summary-information', level: 'main', translation: "Summary" } },
    { title: { id: 'title', level: 'subtitle', translation: "Title" } },
    { creator: { id: 'creator', level: 'subtitle', translation: "Creator" } },
    { pid: { id: 'pid', level: 'subtitle', translation: "PID" } },
    { abstract: { id: 'abstract', level: 'subtitle', translation: "Abstract" } },
    { funding: { id: 'funding', level: 'title', translation: "Funding information" } },
    { collPeriod: { id: 'data-collection-period', level: 'subtitle', translation: ("Data collection period") } },
    { country: { id: 'country', level: 'subtitle', translation: ("Country") } },
    { universe: { id: 'universe', level: 'subtitle', translation: ("Universe") } },
    { publicationYear: { id: 'publication-year', level: 'subtitle', translation: ("Publication year") } }
  ]
};

const renderDetailWithModifiedProps = (modifiedProps: Partial<Props['item']>) => {
  render(<Detail {...baseProps} item={{ ...baseProps.item, ...modifiedProps }} />);
};

// Utility function to check if the heading is present and followed by a specific value
const checkValueAfterHeading = (headingText: string, expectedValue: string) => {
  const headingElement = screen.getByText(headingText);
  expect(headingElement).toBeInTheDocument();

  const nextElement = headingElement.nextElementSibling;
  expect(nextElement).toBeInTheDocument();
  expect(nextElement).toHaveTextContent(expectedValue);
};

const generateKeywordsArray = (numKeywords: number) => {
  return Array.from({ length: numKeywords }, (_, index) => ({
    id: (index + 1).toString(),
    term: `Keyword ${index + 1}`,
    vocab: `Vocab ${index + 1}`,
    vocabUri: `http://example.com/vocab${index + 1}`
  }));
};

it("should render with supplied item", () => {
  render(<Detail {...baseProps} />);
  expect(screen.getByRole('article')).toBeInTheDocument();
});

it("should handle no pidStudies provided", () => {
  renderDetailWithModifiedProps({ pidStudies: [] });
  expect(screen.getByRole('article')).toBeInTheDocument();
});

it("should handle a pidStudy with no agency", () => {
  renderDetailWithModifiedProps({ pidStudies: [{ pid: "TestPid", agency: "" }] });
  expect(screen.getByRole('article')).toBeInTheDocument();
});

it("should handle no title provided", () => {
  renderDetailWithModifiedProps({ titleStudy: undefined });
  expect(screen.getByRole('article')).toBeInTheDocument();
});

it("should handle no publisher provided", () => {
  renderDetailWithModifiedProps({ publisher: undefined });
  expect(screen.getByRole('article')).toBeInTheDocument();
});

it("should handle no study number provided", () => {
  renderDetailWithModifiedProps({ studyNumber: undefined });
  expect(screen.getByRole('article')).toBeInTheDocument();
});

it("should handle generating elements with no value", () => {
  renderDetailWithModifiedProps({ studyAreaCountries: [] });
  checkValueAfterHeading('Country', 'Not available');
});

it("should handle formatting dates with missing data", () => {
  renderDetailWithModifiedProps({ publicationYear: undefined });
  checkValueAfterHeading('Publication year', 'Not available');
});

it("should handle special case where array items are a start/end date range", () => {
  renderDetailWithModifiedProps({
    dataCollectionPeriodStartdate: undefined,
    dataCollectionPeriodEnddate: undefined,
    dataCollectionFreeTexts: [
      { dataCollectionFreeText: "2003-02-01", event: "start" },
      { dataCollectionFreeText: "2006-05-04", event: "end" }
    ]
  });
  checkValueAfterHeading('Data collection period', '01/02/2003 - 04/05/2006');
});

it("should handle formatting dates with fallback array containing date range", () => {
  renderDetailWithModifiedProps({
    dataCollectionPeriodStartdate: undefined,
    dataCollectionPeriodEnddate: undefined,
    dataCollectionFreeTexts: [
      { dataCollectionFreeText: "2003-02-01", event: "" },
      { dataCollectionFreeText: "2006-05-04", event: "" }
    ]
  });
  checkValueAfterHeading('Data collection period', '01/02/2003');
});

it("should handle formatting dates with invalid first date", () => {
  renderDetailWithModifiedProps({ publicationYear: "Not a date" });
  checkValueAfterHeading('Publication year', 'Not a date');
});

it("should handle formatting dates as a range with invalid first date", () => {
  renderDetailWithModifiedProps({
    dataCollectionPeriodStartdate: 'Not a date',
    dataCollectionPeriodEnddate: '2006-05-04'
  });
  checkValueAfterHeading('Data collection period', 'Not a date - 04/05/2006');
});

it("should handle formatting dates as a range with valid second date", () => {
  renderDetailWithModifiedProps({
    dataCollectionPeriodStartdate: '2003-02-01',
    dataCollectionPeriodEnddate: '2006-05-04'
  });
  checkValueAfterHeading('Data collection period', '01/02/2003 - 04/05/2006');
});

it("should handle formatting dates as a range with invalid second date", () => {
  renderDetailWithModifiedProps({
    dataCollectionPeriodStartdate: '2003-02-01',
    dataCollectionPeriodEnddate: 'Not a date'
  });
  checkValueAfterHeading('Data collection period', '01/02/2003 - Not a date');
});

it("should handle formatting dates as a range with valid second date but undefined first date", () => {
  renderDetailWithModifiedProps({
    dataCollectionPeriodStartdate: undefined,
    dataCollectionPeriodEnddate: '2006-05-04'
  });
  checkValueAfterHeading('Data collection period', 'Not available');
});

it("should handle formatting dates as a range with invalid first date", () => {
  renderDetailWithModifiedProps({
    relatedPublications: [
      {
        title: "Related publications title",
        holdings: [],
      }
    ]
  });
  expect(screen.getByRole('article')).toBeInTheDocument();
});

it("should handle no universe exclusion provided", () => {
  renderDetailWithModifiedProps({ universe: { exclusion: undefined, inclusion: 'Exampled studied cohort' } });
  checkValueAfterHeading('Universe', 'Exampled studied cohort');
});

it("should select json and trigger export metadata process", async () => {
  // Spy on document.createElement
  const createElementSpy = jest.spyOn(document, 'createElement');

  // Mock fetch
  const mockFetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ some: 'data' }),
    headers: new Headers(),
    redirected: false,
    status: 200,
    statusText: 'OK',
    type: 'basic',
    url: '',
  } as Response);

  global.fetch = mockFetch;

  // Mock URL.createObjectURL and URL.revokeObjectURL
  const mockCreateObjectURL = jest.fn(() => 'blob:http://localhost/some-blob-url');
  const mockRevokeObjectURL = jest.fn();

  // Apply the mocks to global.URL
  global.URL.createObjectURL = mockCreateObjectURL;
  global.URL.revokeObjectURL = mockRevokeObjectURL;

  render(<Detail {...baseProps} />);

  // Simulate user clicking on the select box to open the dropdown
  const inputElement = screen.getByRole('combobox', { name: 'Export metadata' });
  userEvent.click(inputElement);

  // Simulate selecting the "json" option
  const jsonOption = await screen.findByText('JSON');
  userEvent.click(jsonOption);

  // Simulate clicking the export button (assuming there's a button to trigger export)
  const exportMetadataButton = screen.getByTestId('export-metadata-button');
  userEvent.click(exportMetadataButton);

  // Now, wait for the async operations to complete and assert the correct behavior
  await waitFor(() => {
    // Assertions to ensure the export process was triggered
    expect(mockFetch).toHaveBeenCalledWith(`${window.location.origin}/api/json/coordinate_en/1`);
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
  });

  // Clean up the spies after the test
  createElementSpy.mockRestore();
  (global.fetch as jest.Mock).mockRestore();
  (global.URL.createObjectURL as jest.Mock).mockRestore();
  (global.URL.revokeObjectURL as jest.Mock).mockRestore();
});

it("should handle fetch failure and log error", async () => {
  // Mock fetch to simulate a failure
  const mockFetch = jest.fn().mockResolvedValue({
    ok: false, // Simulate failure
    json: async () => ({ some: 'data' }), // This will not be used
    headers: new Headers(),
    redirected: false,
    status: 500,
    statusText: 'Internal Server Error',
    type: 'basic',
    url: '',
  } as Response);

  global.fetch = mockFetch;

  // Mock URL.createObjectURL and URL.revokeObjectURL
  const mockCreateObjectURL = jest.fn(() => 'blob:http://localhost/some-blob-url');
  const mockRevokeObjectURL = jest.fn();

  global.URL.createObjectURL = mockCreateObjectURL;
  global.URL.revokeObjectURL = mockRevokeObjectURL;

  // Spy on console.error
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(<Detail {...baseProps} />);

  // Simulate user clicking on the select box to open the dropdown
  const inputElement = screen.getByRole('combobox', { name: 'Export metadata' });
  userEvent.click(inputElement);

  // Simulate selecting the "json" option
  const jsonOption = await screen.findByText('JSON');
  userEvent.click(jsonOption);

  // Simulate clicking the export button
  const exportMetadataButton = screen.getByTestId('export-metadata-button');
  userEvent.click(exportMetadataButton);

  // Wait for async operations to complete
  await waitFor(() => {
    // Ensure the fetch call was made
    expect(mockFetch).toHaveBeenCalled();

    // Check if the createObjectURL and revokeObjectURL were not called due to failure
    expect(mockCreateObjectURL).not.toHaveBeenCalled();
    expect(mockRevokeObjectURL).not.toHaveBeenCalled();

    // Check if the error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch JSON data');
  });

  // Clean up mocks and spies
  (global.fetch as jest.Mock).mockRestore();
  (global.URL.createObjectURL as jest.Mock).mockRestore();
  (global.URL.revokeObjectURL as jest.Mock).mockRestore();
  consoleErrorSpy.mockRestore();
});

it('should expand abstract on click', async () => {
  const longLoremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(50) +
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(30) +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '.repeat(20) +
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '.repeat(15);
  renderDetailWithModifiedProps({ abstract: longLoremIpsum });

  // Verify initial state
  const toggleButton = screen.getByTestId('expand-abstract');
  expect(toggleButton).toBeInTheDocument();
  const { getByText, queryByText } = within(toggleButton);
  expect(getByText('Read more')).toBeInTheDocument();
  expect(queryByText('Read less')).toBeNull();

  // Simulate clicking the toggle button
  userEvent.click(toggleButton);

  // Verify state after clicking
  await waitFor(() => {
    expect(getByText('Read less')).toBeInTheDocument();
    expect(queryByText('Read more')).toBeNull();
  });
});

it('should expand info box on click', async () => {
  renderDetailWithModifiedProps({ keywords: generateKeywordsArray(13) });

  // Verify initial state
  const toggleButton = screen.getByTestId('expand-info-box');
  expect(toggleButton).toBeInTheDocument();
  const { getByText, queryByText } = within(toggleButton);
  expect(getByText('Read more')).toBeInTheDocument();
  expect(queryByText('Read less')).toBeNull();

  // Simulate clicking the toggle button
  userEvent.click(toggleButton);

  // Verify state after clicking
  await waitFor(() => {
    expect(getByText('Read less')).toBeInTheDocument();
    expect(queryByText('Read more')).toBeNull();
  });
});

it('should expand keywords on click', async () => {
  renderDetailWithModifiedProps({ keywords: generateKeywordsArray(13) });

  // Verify initial state
  const toggleButton = screen.getByTestId('expand-keywords');
  expect(toggleButton).toBeInTheDocument();
  const { getByText, queryByText } = within(toggleButton);
  expect(getByText('Read more')).toBeInTheDocument();
  expect(queryByText('Read less')).toBeNull();

  // Simulate clicking the toggle button
  userEvent.click(toggleButton);

  // Verify state after clicking
  await waitFor(() => {
    expect(getByText('Read less')).toBeInTheDocument();
    expect(queryByText('Read more')).toBeNull();
  });
});

it('should add funding information if it exists', async () => {
  const fundingData = [
    {
      agency: "Some Agency",
      grantNumber: "ID000"
    },
    {
      agency: "Another Agency",
      grantNumber: "1234"
    },
    {
      grantNumber: "IdButNoAgency"
    },
    {
      agency: "Finnish Agency"
    }
  ];

  renderDetailWithModifiedProps({ funding: fundingData });

  // Funding section should exist
  const fundingSection = screen.getByTestId('funding');
  expect(fundingSection).toBeInTheDocument();

  // Funding title should exist
  const fundingTitle = await screen.findByText('Funding information');
  expect(fundingTitle).toBeInTheDocument();

  // Check for each agency and grantNumber in the funding data
  fundingData.forEach((funding) => {
    if (funding.agency) {
      expect(within(fundingSection).getByText(funding.agency)).toBeInTheDocument();
    }

    if (funding.grantNumber) {
      expect(within(fundingSection).getByText(funding.grantNumber)).toBeInTheDocument();
    }
  });
});

it('should not add funding information if it does not exist', () => {
  renderDetailWithModifiedProps({ funding: [] });

  // Attempt to find the funding information section
  const fundingSection = screen.queryByText('Funding');

  // Expect it to not be present in the document
  expect(fundingSection).not.toBeInTheDocument();
});

it('should format data kind values from free texts, types and general data formats into one array', () => {
  render(<Detail {...baseProps} />);
  const expectedOutput = [
    "Quantitative",
    "Numeric",
    "Software",
    "Text",
    "Other"
  ];

  const dataKindDivs = screen.getAllByTestId('data-kind');
  const dataKindValues = dataKindDivs.map(div => div.textContent?.trim()).filter(Boolean);

  expect(dataKindValues).toEqual(expectedOutput);
});

it('should format creators correctly', () => {
  render(<Detail {...baseProps} />);

  const creatorElements = screen.getAllByTestId('creator');
  expect(creatorElements.length).toBe(mockStudy.creators.length);

  // Check each creator element
  mockStudy.creators.forEach((creator, index) => {
    const creatorElement = creatorElements[index];
    
    // Check if creator's name is rendered
    expect(creatorElement).toHaveTextContent(creator.name);

    // Check if affiliation is rendered correctly
    if (creator.affiliation) {
      expect(creatorElement).toHaveTextContent(`(${creator.affiliation})`);
    }

    // Check if identifier is rendered correctly
    if (creator.identifier) {
      expect(creatorElement).toHaveTextContent(` - ${creator.identifier.type || 'Research Identifier'}: `);

      if (creator.identifier.uri) {
        // Check if the link is present and correct
        const link = creatorElement.querySelector('a');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', creator.identifier.uri);
        expect(link).toHaveTextContent(creator.identifier.id || creator.identifier.uri);
      } else if (creator.identifier.id) {
        expect(creatorElement).toHaveTextContent(creator.identifier.id);
      }
    }
  });
});
