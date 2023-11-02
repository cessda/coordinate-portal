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
// import { connect, Dispatch } from "react-redux";
// import { AnyAction, bindActionCreators } from "redux";
import { Link, useLocation } from "react-router-dom";
// import type { State } from "../types";
// import { changeLanguage } from "../actions/language";
// import { push } from "react-router-redux";
import { CMMStudy } from "../../common/metadata";
import getPaq from "../utilities/getPaq";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks";

function generateCreatorElements(item: CMMStudy) {
  const creators: JSX.Element[] = [];

  if(item.creators){
    for (let i = 0; i < item.creators.length; i++) {
      creators.push(
        <span key={i}>
          {item.creators[i]}
          {i < item.creators.length - 1 ? "; " : ""}
        </span>
      );

      if (i === 2 && item.creators.length > 3) {
        creators.push(<span key={3}>({item.creators.length - 3} more)</span>);
        break;
      }
    }
  }

  return creators;
}

// interface Hit extends CMMStudy {
//   objectID: string;
//   __position: number;
//   _highlightResult: {
//     abstract: {
//       matchLevel: string;
//       matchedWords: [];
//       value: string;
//     },
//     titleStudy: {
//       matchLevel: string;
//       matchedWords: [];
//       value: string;
//     }
//   };
//   _snippetResult: {
//     abstract: {
//       matchLevel: string;
//       matchedWords: [];
//       value: string;
//     }
//   };
// }

// export interface CMMStudyHit {
//   hit: Hit;
// }

interface ResultProps {
  hit: any;
  showAbstract: boolean;
}

const Result: React.FC<ResultProps> = ({ hit, showAbstract }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLanguage = useAppSelector((state) => state.language.currentLanguage.code);
  // const item = useAppSelector((state) => state.search.displayed[hit.__position]);
  const dispatch = useAppDispatch();

  //console.log(hit);

  const [abstractExpanded, setAbstractExpanded] = useState(false);

  // if (item === undefined) {
  //   return null;
  // }  

  const languages: JSX.Element[] = [];
  // for (let i = 0; i < hit.langAvailableIn.length; i++) {
  //   languages.push(
  //     // <Link
  //     //   key={i}
  //     //   className="button is-small is-white"
  //     //   to={{
  //     //     pathname: "/detail",
  //     //     query: {
  //     //       q: item.id,
  //     //       lang: item.langAvailableIn[i].toLowerCase(),
  //     //     },
  //     //   }}
  //     //   onClick={() => dispatch(changeLanguage(item.langAvailableIn[i]))}
  //     // >
  //     //   {item.langAvailableIn[i]}
  //     // </Link>
  //   );
  // }

  function handleKeyDown(event: React.KeyboardEvent, titleStudy: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      handleAbstractExpansion(titleStudy);
    }
  };

  function handleAbstractExpansion(titleStudy: string) {
    // Notify Matomo Analytics of toggling "Read more" for a study.
    //const _paq = getPaq();
    //_paq.push(['trackEvent', 'Search', 'Read more', titleStudy]);

    setAbstractExpanded(!abstractExpanded)
  }

  function normalizeAndDecodeHTML(text: string) {
    text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    text = text.replace(/<\/?[A-Z]+>/g, function(match) {
      return match.toLowerCase();
    });
    text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var element = document.createElement('div');
    element.innerHTML = text;
    return element.textContent || element.innerText;
  }

  // TODO Might have to remove all HTML Entities when abstract is not expanded
  const renderAbstract = () => {
    //console.log(hit);
    let abstract = normalizeAndDecodeHTML(hit.abstract);
    let matchedWords = hit._highlightResult.abstract.matchedWords;
    if(matchedWords.length > 0) {
      if(abstractExpanded) {
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
              to={`detail/${hit.objectID}`}
              state={{ from: location.pathname }}>
          <span dangerouslySetInnerHTML={{ __html: hit._highlightResult.titleStudy.value || hit.titleStudy }}></span>
        </Link>
        {/* <Link
          to={{
            pathname: "/detail",
            query: {
              q: item.id,
              lang: currentLanguage,
            },
          }}
        > */}
          {/* <span
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult.titleStudy.value || hit.titleStudy,
            }}
          ></span> */}
        {/* </Link> */}
      </h2>
      <div className="subtitle is-6">{creators}</div>
      {/* <div className="desc">
        {abstractExpanded ? (
          <span className="abstr"
                dangerouslySetInnerHTML={{
                __html: hit._highlightResult.abstract.value || hit.abstract }} />
        ) : (
          <span dangerouslySetInnerHTML={{
                __html: `${hit._highlightResult.abstract.value.substring(0, 500)}...` || `${hit.abstract.substring(0, 500)}...` }} />
        )}
      </div> */}
      {showAbstract && (
        <div className="abstract">
          <div dangerouslySetInnerHTML={{ __html: renderAbstract() }} />
          {/* {abstractExpanded ? (
            <div dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(renderAbstract()) }} />
          ) : (
            <div>
              {decodeHTMLEntities(renderAbstract())}
              {!abstractExpanded && hit.abstract.length > 500 && '...'}
            </div>
          )} */}
        </div>
      )}
      <span className="level mt-10 result-actions">
        <span className="level-left is-hidden-touch">
          <div className="field is-grouped">
            <div className="control">
              {showAbstract && hit.abstract.length > 500 && (
                <a className="button no-border focus-visible"
                  tabIndex={0}
                  onClick={() => handleAbstractExpansion(hit.titleStudy)}
                  onKeyDown={(e) => handleKeyDown(e, hit.titleStudy)}>
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
              {/* {item.studyUrl && (
                <a
                  className="button is-small is-white"
                  href={item.studyUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="icon is-small">
                    <FaExternalLinkAlt />
                  </span>
                  <span>{t("goToStudy")}</span>
                </a>
              )} */}
            </div>
          </div>
        </span>
      </span>
    </div>
  );
};

export default Result;
