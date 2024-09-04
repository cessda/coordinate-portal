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

import { render, screen, waitFor } from "../../testutils";
import Tooltip, { TooltipProps } from '../../../src/components/Tooltip';
import React from 'react';
import userEvent from '@testing-library/user-event';

const baseProps: TooltipProps = {
  content: "Content",
  ariaLabel: "Aria label",
  classNames: {container: 'mt-10-negative ml-1'}
};

it('should render', () => {
  render(<Tooltip {...baseProps} />);
  const tooltipButton = screen.getByTestId('tooltip-button');
  expect(tooltipButton).toBeInTheDocument();
});

it('should display content on hover', async () => {
  render(<Tooltip {...baseProps} />);
  const tooltipContainer = screen.getByTestId('tooltip-container');
  userEvent.hover(tooltipContainer);

  // Wait for the tooltip content to appear
  await waitFor(() => {
    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
  });

  expect(screen.getByText(baseProps.content)).toBeInTheDocument();
});

it('should hide content on mouse leave', async () => {
  render(<Tooltip {...baseProps} />);
  
  const tooltipButton = screen.getByTestId('tooltip-button');
  userEvent.hover(tooltipButton);
  
  // Wait for the tooltip content to appear
  await waitFor(() => {
    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
  });

  const tooltipContainer = screen.getByTestId('tooltip-container');
  userEvent.unhover(tooltipContainer);
  
  // Wait for tooltip content to disappear
  await waitFor(() => {
    expect(screen.queryByTestId('tooltip-content')).toBeNull();
  });
});

it('should toggle content on button click', async () => {
  render(<Tooltip {...baseProps} />);
  
  const tooltipButton = screen.getByTestId('tooltip-button');
  
  // Click to activate the tooltip
  userEvent.click(tooltipButton);
  
  // Wait for the tooltip content to appear
  await waitFor(() => {
    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
  });

  // Click again to deactivate the tooltip
  userEvent.click(tooltipButton);
  
  // Wait for the tooltip content to disappear
  await waitFor(() => {
    expect(screen.queryByTestId('tooltip-content')).toBeNull();
  });
});

it('should hide content on Escape key press', async () => {
  render(<Tooltip {...baseProps} />);
  
  const tooltipButton = screen.getByTestId('tooltip-button');

  // Focus tooltip button
  tooltipButton.focus();

  // Simulate Escape key press
  userEvent.keyboard('{Enter}');

  // Wait for the tooltip content to appear
  await waitFor(() => {
    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
  });

  // Simulate Escape key press
  userEvent.keyboard('{Escape}');

  // Wait for tooltip content to disappear
  await waitFor(() => {
    expect(screen.queryByTestId('tooltip-content')).toBeNull();
  });
});


it('should hide content on blur', async () => {
  render(<Tooltip {...baseProps} />);
  const tooltipButton = screen.getByTestId('tooltip-button');

  // Ensure the tooltip button is focused
  tooltipButton.focus();

  // Simulate Escape key press
  userEvent.keyboard('{Enter}');

  // Wait for the tooltip content to appear
  await waitFor(() => {
    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
  });

  // Simulate blur event (by focusing on another element)
  userEvent.tab();

  // Wait for the tooltip content to disappear
  await waitFor(() => {
    expect(screen.queryByTestId('tooltip-content')).toBeNull();
  });
});

it('should handle positioning near bottom of the viewport', async () => {
  // Adjust the height of the window so that tooltip should be placed above
  // (even though it doesn't really have enough room there either in this case)
  window.innerHeight = 100;

  render(<Tooltip {...baseProps} />);
  const tooltipButton = screen.getByTestId('tooltip-button');
  userEvent.click(tooltipButton);

  // Wait for the tooltip content to appear
  await waitFor(() => {
    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
  });

  expect(screen.getByTestId('tooltip-content')).toHaveClass('tooltip-above');
});
