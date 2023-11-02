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

import React, { useState } from "react";
import { HeadingEntry } from "../containers/DetailPage";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaAngleLeft } from "react-icons/fa";

export interface Props {
  headings: HeadingEntry[];
}

// Extend the Searchkit Panel component to support tooltips and translations.
const DetailIndex = ({ headings }: Props) => {
  // let titleNode
  // if (collapsable) {
  //   titleNode = (
  //     <div onClick={() => { setCollapsed(collapsed => !collapsed) }}>
  //       {title}
  //     </div>
  //   )
  // } else {
  //   titleNode = <div>{title}</div>
  // }
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      navigate(-1);
    }
  };

  return (
    <div className="float index">
      {location.state?.from === "/" &&
        <a className="button no-border focus-visible pl-0 mb-2"
          tabIndex={0}
          onClick={() => navigate(-1)}
          onKeyDown={(e) => handleKeyDown(e)}>
          <span className="icon is-small">
            <FaAngleLeft />
          </span>
          <span>{t("backToSearch")}</span>
        </a>
      }
      <ul>
        {headings.map((entry) => {
          const key = Object.keys(entry)[0]; // Get the key of the current entry
          const { id, level, translation } = entry[key];
          const classNames = level === 'main' ? 'mb-2' : (level === 'title' ? 'mt-4 mb-2' : '');

          return (
            <li key={id} className={classNames}>
              {/* {level === 'title' ? <h2>{translation}</h2> : <h3>{translation}</h3>} */}
              <a href={`#${id}`} className={level}>{translation}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DetailIndex;
