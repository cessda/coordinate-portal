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

import React, { useState, useRef } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

export interface TooltipProps {
  content: string;
  id?: string;
  classNames?: { container?: string, button?: string, content?: string, item?: string };
  ariaLabel?: string;
}

const Tooltip = ({ content, id, classNames, ariaLabel }: TooltipProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const tooltipButtonRef = useRef<HTMLButtonElement>(null);
  const minDistanceFromBottom = 200;

  const calculatePosition = () => {
    if (tooltipButtonRef.current) {
      const rect = tooltipButtonRef.current.getBoundingClientRect();
      const nearBottom = window.innerHeight - rect.bottom < minDistanceFromBottom;
      setIsNearBottom(nearBottom);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Toggle visibility based on current state
    if (!isActive) {
      calculatePosition();
    }
    setIsActive(!isActive);
  };

  // Focus and press Enter or Space to toggle tooltip
  // Mouse click to toggle tooltip
  // Hover to open tooltip
  // Unfocus, Unhover or Escape to close tooltip
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isActive) {
      event.preventDefault();
      event.stopPropagation();
      setIsActive(false);
    }
  };

  return (
    <div
      className={`dropdown is-right ${classNames?.container}${isActive ? ' is-active' : ''}`}
      onBlur={() => setIsActive(false)}
      onMouseEnter={() => { calculatePosition(); setIsActive(true); }}
      onMouseLeave={() => setIsActive(false)}
      data-testid="tooltip-container"
    >
      <div className="dropdown-trigger">
        <button
          ref={tooltipButtonRef}
          className={`button focus-visible ${classNames?.button}`}
          aria-haspopup="true"
          {...(isActive ? { 'aria-describedby': id } : { 'aria-label': ariaLabel })}
          onClick={(e) => handleClick(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          data-testid='tooltip-button'
        >
          <FaQuestionCircle className="tooltip-icon" aria-hidden="true" />
        </button>
      </div>
      {isActive && (
        <div className={`dropdown-menu ${isNearBottom ? ' tooltip-above' : ''}`} data-testid="tooltip-content">
          <div className={`dropdown-content ${classNames?.content}`}>
            <div
              id={id}
              className={`dropdown-item ${classNames?.item}`}
              role="tooltip"
              aria-hidden={isActive ? 'false' : 'true'}
            >
              <p dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
