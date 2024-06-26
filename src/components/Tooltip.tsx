/* eslint-disable react/display-name */
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

import React, {useState, useRef} from 'react';
import {FaQuestionCircle} from 'react-icons/fa';

interface TooltipProps {
  content: string;
  id?: string;
  classNames?: {container?: string, button?: string, content?: string, item?: string};
  ariaLabel?: string;
}

export default ({ content, id, classNames, ariaLabel }: TooltipProps) => {
  const [isActive, setIsActive] = useState(false);
  const tooltipButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isActive) {
      event.preventDefault();
      event.stopPropagation();
      if (tooltipButtonRef.current) {
        tooltipButtonRef.current.click();
      } else {
        setIsActive(false);
      }
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActive(!isActive);
  };

  // Focus and press Enter or Space to toggle tooltip
  // Mouse click to toggle tooltip
  // Hover to open tooltip
  // Unfocus, Unhover or Escape to close tooltip
  return (
    <div className={`dropdown is-right ${classNames?.container}${isActive ? ' is-active' : ''}`}
         onBlur={() => setIsActive(false)}
         onMouseEnter={() => setIsActive(true)}
         onMouseLeave={() => setIsActive(false)}>
      <div className="dropdown-trigger">
        <button ref={tooltipButtonRef} className={`button focus-visible ${classNames?.button}`} aria-haspopup="true"
                {...(isActive ? {'aria-describedby': id} : {'aria-label': ariaLabel})}
                onClick={(e) => handleClick(e)}
                onKeyDown={(e) => handleKeyDown(e)}>
          <FaQuestionCircle className="tooltip-icon" aria-hidden="true"/>
        </button>
      </div>
      <div className="dropdown-menu">
        <div className={`dropdown-content ${classNames?.content}`}>
          <div id={id} className={`dropdown-item ${classNames?.item}`} role="tooltip"
               aria-hidden={isActive ? 'false' : 'true'}>
            <p dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </div>
  );
}
