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
import {
  FaAngleDown,
  FaAngleUp,
  FaExternalLinkAlt,
  FaLanguage,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { CMMStudy } from "../../common/metadata";
// import getPaq from "../utilities/getPaq";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateLanguage } from "../reducers/language";

function generateCreatorElements(item: CMMStudy) {
  const creators: JSX.Element[] = [];
  // How many creators should be shown
  const creatorsLength = 3;

  if (item.creators) {
    for (let i = 0; i < item.creators.length; i++) {
      creators.push(
        <span key={i}>
          {item.creators[i].affiliation ? (
            `${item.creators[i].name} (${item.creators[i].affiliation})`
          ) : (
            item.creators[i].name
          )}
          {i < item.creators.length - 1 ? "; " : ""}
        </span>
      );

      if (i === 2 && item.creators.length > creatorsLength) {
        creators.push(<span key={3}>({item.creators.length - creatorsLength} more)</span>);
        break;
      }
    }
  }

  return creators;
}

interface ResultProps {
  hit: any;
  showAbstract: boolean;
}

const Result: React.FC<ResultProps> = ({ hit, showAbstract }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const dispatch = useAppDispatch();

  const [abstractExpanded, setAbstractExpanded] = useState(false);

  const languages: JSX.Element[] = [];
  for (let i = 0; i < hit?.langAvailableIn?.length; i++) {
    languages.push(
      <Link
        key={i}
        className="button is-small is-white"
        to={`/detail/${hit.objectID}?lang=${hit.langAvailableIn[i].toLowerCase()}`}
        onClick={() => dispatch(updateLanguage(hit.langAvailableIn[i]))}
      >
        {hit.langAvailableIn[i]}
      </Link>
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent, titleStudy: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      handleAbstractExpansion(titleStudy);
    }
  }

  const handleClick = (event: React.MouseEvent, titleStudy: string) => {
    event.preventDefault();
    event.stopPropagation();
    handleAbstractExpansion(titleStudy);
  };

  const handleAbstractExpansion = (titleStudy: string) => {
    // Notify Matomo Analytics of toggling "Read more" for a study.
    //const _paq = getPaq();
    //_paq.push(['trackEvent', 'Search', 'Read more', titleStudy]);

    setAbstractExpanded(!abstractExpanded)
  }

  function normalizeAndDecodeHTML(text: string) {
    if (text) {
      text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      text = text.replace(/<\/?[A-Z]+>/g, function (match) {
        return match.toLowerCase();
      });
      text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    const element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent || element.innerText;
  }

  // TODO Might have to remove all HTML Entities when abstract is not expanded
  const renderAbstract = () => {
    let abstract = normalizeAndDecodeHTML(hit.abstract);
    const matchedWords = hit._highlightResult?.abstract?.matchedWords || [];
    if (matchedWords.length > 0) {
      if (abstractExpanded) {
        // Create a regular expression that matches any of the highlighted texts
        const regexString = matchedWords.map((text: string) => `(${text})`).join('|');
        const regex = new RegExp(regexString, 'gi');

        // Use the regular expression to find and highlight all matching texts in the full abstract
        abstract = abstract.replace(regex, (match: string) => `<mark>${match}</mark>`);
      } else {
        abstract = normalizeAndDecodeHTML(hit._highlightResult.abstract.value);
      }
    }

    // Make sure abstract is not longer than around 500 characters but don't slice in the middle of the word
    if (!abstractExpanded) {
      abstract = abstract.length <= 500 ? abstract : abstract.slice(0, abstract.lastIndexOf(' ', 500)) + '...';
    }

    return abstract;
  };

  const creators = generateCreatorElements(hit);

  return (
    <div className="list-hit" data-qa="hit">
      <h2 className="title is-6">
        <Link className="focus-visible"
          to={`detail/${hit.objectID}?lang=${currentLanguage.code}`}
          state={{ from: location.pathname }}>
          <span dangerouslySetInnerHTML={{ __html: hit._highlightResult?.titleStudy?.value || hit.titleStudy }}></span>
        </Link>
      </h2>
      <div className="subtitle is-6">{creators}</div>
      {showAbstract && (
        <div className="abstract">
          <div dangerouslySetInnerHTML={{ __html: renderAbstract() }} />
        </div>
      )}
      <span className="level mt-10 result-actions">
        <span className="level-left is-hidden-touch">
          <div className="field is-grouped">
            <div className="control">
              {showAbstract && hit.abstract?.length > 500 && (
                <a className="button no-border focus-visible"
                  tabIndex={0}
                  onClick={(e) => handleClick(e, hit.titleStudy)}
                  onKeyDown={(e) => handleKeyDown(e, hit.titleStudy)}
                  data-testid="expand-abstract">
                  {abstractExpanded ? (
                    <>
                      <span className="icon is-small">
                        <FaAngleUp />
                      </span>
                      <span>{t("readLess")}</span>
                    </>
                  ) : (
                    <>
                      <span className="icon is-small">
                        <FaAngleDown />
                      </span>
                      <span>{t("readMore")}</span>
                    </>
                  )}
                </a>
              )}
            </div>
          </div>
        </span>
        <span className="level-right">
          <div className="field is-grouped is-grouped-multiline">
            {languages.length > 0 && (
              <div className="control">
                <div className="buttons has-addons">
                  <span className="button no-border bg-w pe-none">
                    <span className="icon is-small">
                      <FaLanguage />
                    </span>
                    <span>{t("language.label")}:</span>
                  </span>
                  {languages}
                </div>
              </div>
            )}
            <div className="control">
              {hit.studyUrl && (
                <a
                  className="button is-small is-white"
                  href={hit.studyUrl}
                  rel="noreferrer"
                  target="_blank"
                  data-testid="study-url"
                >
                  <span className="icon is-small">
                    <FaExternalLinkAlt />
                  </span>
                  <span>{t("goToStudy")}</span>
                </a>
              )}
            </div>
          </div>
        </span>
      </span>
    </div>
  );
};

export default Result;
