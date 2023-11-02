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
import { Link } from "react-router-dom";
import Panel from "./Panel";
import { truncate, upperFirst } from "lodash";
import {
  CMMStudy,
  DataCollectionFreeText,
  getDDI,
  Universe,
} from "../../common/metadata";
import {
  ChronoField,
  DateTimeFormatter,
  DateTimeFormatterBuilder,
} from "@js-joda/core";
import { FaAngleDown, FaAngleUp, FaExternalLinkAlt } from "react-icons/fa";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import Tooltip from "./Tooltip";
import { HeadingEntry } from "../containers/DetailPage";
import Select from 'react-select';
import { useAppSelector } from "../hooks";

export interface Props {
  item: CMMStudy;
  headings: HeadingEntry[];
  // lang: string;
}

export interface State {
  abstractExpanded: boolean;
  keywordsExpanded: boolean;
}

interface Option {
  value: string;
  label: string;
}

const Detail = (props: Props) => {
  const { t, i18n } = useTranslation();
  const language = useAppSelector((state) => state.language);

  const item = props.item;
  const headings = props.headings;
  const truncatedAbstractLength = 2000;
  const truncatedKeywordsLength = 12;

  const [abstractExpanded, setAbstractExpanded] = useState(props.item.abstract.length > truncatedAbstractLength);
  const [keywordsExpanded, setKeywordsExpanded] = useState(props.item.abstract.length > truncatedKeywordsLength);
  const [selectedExportMetadataOption, setSelectedExportMetadataOption] = useState<Option | null>(null);
  const [selectedExportCitationOption, setSelectedExportCitationOption] = useState<Option | null>(null);

  // componentDidUpdate(prevProps: Props) {
  //   // If the item has changed, reset the expanded state of the abstract
  //   if (this.props.item.id !== prevProps.item.id) {
  //     this.setState(() => ({
  //       abstractExpanded: !(
  //         this.props.item.abstract.length > Detail.truncatedAbstractLength
  //       ),
  //       keywordsExpanded: !(
  //         this.props.item.keywords.length > Detail.truncatedKeywordsLength
  //       ),
  //     }));
  //   }
  // }

  const formatter = new DateTimeFormatterBuilder()
    .appendValue(ChronoField.YEAR)
    .optionalStart()
    .appendLiteral("-")
    .appendValue(ChronoField.MONTH_OF_YEAR)
    .optionalStart()
    .appendLiteral("-")
    .appendValue(ChronoField.DAY_OF_MONTH)
    .optionalStart()
    .appendLiteral("T")
    .append(DateTimeFormatter.ISO_OFFSET_TIME)
    .toFormatter();

  const dateFormatter = DateTimeFormatter.ofPattern("[[dd/]MM/]uuuu");

  function generateElements<T, R>(
    field: T[],
    element: 'div' | 'tag' | 'ul',
    callback?: (args: T) => React.ReactNode,
    omitLang?: boolean
  ) {
    const elements: JSX.Element[] = [];
    // const lang = props.lang;
    const lang = 'en';

    for (let i = 0; i < field.length; i++) {
      if (field[i]) {
        const value = callback?.(field[i]) ?? field[i];
        switch(element) {
          case 'tag':
            elements.push(<span className="tag" lang={omitLang ? undefined : lang} key={i}>{value as React.ReactNode}</span>);
            break;
          case 'div':
            elements.push(<div lang={omitLang ? undefined : lang} key={i}>{value as React.ReactNode}</div>);
            break;
          case 'ul':
            elements.push(<li key={i}>{value as React.ReactNode}</li>)
        }
      }
    }

    if (elements.length === 0) {
      <span>{t("language.notAvailable.field")}</span>;
    }

    if (element === 'ul') {
      return (
        <ul lang={omitLang ? undefined : lang}>
          {elements}
        </ul>
      );
    } else {
      return elements;
    }
  }

  function formatDate(
    dateTimeFormatter: DateTimeFormatter,
    date1?: string,
    date2?: string,
    dateFallback?: DataCollectionFreeText[]
  ): JSX.Element | JSX.Element[] {
    const { t, i18n } = useTranslation();
    if (!date1 && !date2 && !dateFallback) {
      return <span>{t("language.notAvailable.field")}</span>;
    }
    if (!date1 && !date2 && dateFallback) {
      if (
        dateFallback.length === 2 &&
        dateFallback[0].event === "start" &&
        dateFallback[1].event === "end"
      ) {
        // Handle special case where array items are a start/end date range.
        return formatDate(
          dateTimeFormatter,
          dateFallback[0].dataCollectionFreeText,
          dateFallback[1].dataCollectionFreeText
        );
      }
      // Generate elements for each date in the array.
      return generateElements(dateFallback, "div", (date) =>
        parseDate(date.dataCollectionFreeText, dateTimeFormatter)
      );
    }

    if (date1) {
      if (!date2) {
        return <p>{parseDate(date1, dateTimeFormatter)}</p>;
      } else {
        return (
          <p>
            {parseDate(date1, dateTimeFormatter)} -{" "}
            {parseDate(date2, dateTimeFormatter)}
          </p>
        );
      }
    } else {
      return <span>{t("language.notAvailable.field")}</span>;
    }
  }

  /**
   * Attempt to format the given date string.
   *
   * @param dateString the date string to parse.
   * @param dateTimeFormatter the formatter to use.
   * @returns a formatted date, or the original string if an error occured when formatting.
   */
  function parseDate(
    dateString: string,
    dateTimeFormatter: DateTimeFormatter
  ): string {
    // Format array item as date if possible.
    try {
      const temporalAccessor = formatter.parse(dateString);
      return dateTimeFormatter.format(temporalAccessor);
    } catch (e) {
      // Handle unparsable strings by returning the given value.
      console.debug(e);
      return dateString;
    }
  }

  /**
   * Formats the given universe into a <p> element. The resulting element will contain
   * the text content "${Included universe} (excluding ${Excluded universe})"
   *
   * @param universe the universe to format
   * @returns the formatted <p> element
   */
  function formatUniverse(universe: Universe) {
    const inclusion = <p>{striptags(universe.inclusion)}</p>;

    if (universe.exclusion) {
      return (
        <>
          {inclusion}
          <p>Excludes: {striptags(universe.exclusion)}</p>
        </>
      );
    } else {
      return inclusion;
    }
  }

  function generateHeading(headingKey: string, classNames?: string, overrideId?: string) {
    // Find the heading object with the specified key
    const headingObj = headings.find((entry) => entry[headingKey]);
  
    if (!headingObj) {
      return null; // Handle the case where the heading key doesn't exist
    }
  
    const { translation, level } = headingObj[headingKey];
    const id = overrideId ? overrideId : headingObj[headingKey].id;
    const Element = level === 'main' ? 'h1' : (level === 'title' ? 'h2' : 'h3');
  
    return (
      <Element id={id} className={`metadata-${level} ${classNames ?? ''}`}>
        {translation}
      </Element>
    );
  }

  const exportMetadataOptions: Option[] = [
    { value: 'json', label: 'JSON' },
    // { value: 'ddi25', label: 'DDI 2.5' },
  ]

  const handleExportMetadataChange = (selectedOption: Option | null) => {
    setSelectedExportMetadataOption(selectedOption);
  };

  const handleExportMetadata = async () => {
    if (selectedExportMetadataOption?.value) {
      let exportData;
      let fileName;
      let mimeType;
      const sanitizedTitle = item.titleStudy.toLowerCase().replace(/ /g, '_');

      switch (selectedExportMetadataOption.value) {
        case 'json':
          // Fetch the JSON data from the API
          const jsonResponse = await fetch(`${window.location.origin}/api/json/${language.currentLanguage.index}/${encodeURIComponent(item.id)}`);

          if (jsonResponse.ok) {
            exportData = JSON.stringify(await jsonResponse.json(), null, 2)
            fileName = `${sanitizedTitle}.json`;
            mimeType = 'application/json';
          } else {
            console.error('Failed to fetch JSON data');
            return;
          }
          break;

        case 'ddi25':
          // Set exportData for DDI export
          exportData = getDDI(item);
          fileName = `${sanitizedTitle}.xml`;
          mimeType = 'application/xml';
          break;

        default:
          break;
      }

      if (exportData && fileName && mimeType) {
        // Create a Blob containing the export data
        const blob = new Blob([exportData], { type: mimeType });
        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);
        // Create an <a> element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        // Trigger a click event on the <a> element to prompt the download
        a.click();
        // Release the Blob URL
        window.URL.revokeObjectURL(url);
      }
    }
  }

  const exportCitationOptions = [
    { value: 'bibtext', label: 'BibTeX' },
    { value: 'ris', label: 'RIS' },
    { value: 'endnote', label: 'EndNote' },
  ]

  const handleExportCitationChange = (selected: Option | null) => {
    setSelectedExportCitationOption(selected);
  };

  const handleExportCitation = () => {
    if (selectedExportCitationOption?.value) {
      // Implement the export logic based on the selectedOption.value
      switch (selectedExportCitationOption.value) {
        case 'bibtext':
          // Implement BibTeX export logic here
          console.log('Exporting as BibTeX');
          break;
        case 'ris':
          // Implement RIS export logic here
          console.log('Exporting as RIS');
          break;
        case 'endnote':
          // Implement EndNote export logic here
          console.log('Exporting as EndNote');
          break;
        default:
          break;
      }
    }
  }

  return (
    <>
    <div className="columns is-vcentered">
      <div className="column is-5">
        <div className="columns is-flex is-flex-wrap-wrap is-vcentered is-centered">
          <div className="column is-flex is-flex-grow-0 is-narrow">
            <span className="is-inline-flex">{t("exportMetadata")}</span>
            {/* <Tooltip content={t("metadata.keywords.tooltip.content")}
                    ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}
                    classNames={{container: 'ml-1'}}/> */}
          </div>
          <div className="column is-flex is-flex-grow-0 is-narrow px-0">
            <Select options={exportMetadataOptions}
                    defaultValue={{ value: '', label: ''}}
                    onChange={handleExportMetadataChange}
                    className="export-select"/>
          </div>
          <div className="column is-flex is-flex-grow-0 is-narrow pl-0">
            <button className="button is-info is-light" onClick={handleExportMetadata}
                    disabled={!selectedExportMetadataOption || selectedExportMetadataOption.value.trim() === ''}>
              {t("export")}
            </button>
          </div>
        </div>
      </div>
      <div className="column is-5">
        <div className="columns is-flex is-flex-wrap-wrap is-vcentered is-centered">
          <div className="column is-flex is-flex-grow-0 is-narrow">
            <span className="is-inline-flex">{t("exportCitation")}</span>
            {/* <Tooltip content={t("metadata.keywords.tooltip.content")}
                    ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}
                    classNames={{container: 'ml-1'}}/> */}
          </div>
          <div className="column is-flex is-flex-grow-0 is-narrow px-0">
            <Select options={exportCitationOptions}
                    defaultValue={{ value: '', label: ''}}
                    onChange={handleExportCitationChange}
                    className="export-select"/>
          </div>
          <div className="column is-flex is-flex-grow-0 is-narrow pl-0">
            <button className="button is-info is-light"
                    onClick={() => alert("Not yet implemented")}
                    // onClick={handleExportCitation}
                    disabled={!selectedExportCitationOption || selectedExportCitationOption.value.trim() === ''}>
              {t("export")}
            </button>
          </div>
        </div>
      </div>
      <div className="column is-2">
        {item.studyUrl && (
          <a // className="button is-small is-white"
            className="is-inline-flex"
            href={item.studyUrl}
            rel="noreferrer"
            target="_blank">
            <span className="icon is-small mt-1 mr-1">
              <FaExternalLinkAlt />
            </span>
            <span>{t("goToStudy")}</span>
          </a>
        )}
      </div>
    </div>
    <div className="metadata-container">
      <div className="info-box is-hidden-touch">
        <section>
          {generateHeading('topics', 'is-inline-flex', 'info-box-topics')}
          <Tooltip content={t("metadata.topics.tooltip.content")}
                  ariaLabel={t("metadata.topics.tooltip.ariaLabel")}
                  classNames={{container: 'mt-3 ml-1'}}/>
          <div className="tags mt-2">
            {generateElements(item.classifications, "tag",
              (classifications) => (
                <Link to={`/?topics%5B0%5D=${encodeURI(classifications.term.toLowerCase())}`} reloadDocument>
                  {upperFirst(classifications.term)}
                </Link>
              )
            )}
          </div>
        </section>
        <section>
          {generateHeading('keywords', 'is-inline-flex', 'info-box-keywords')}
          <Tooltip content={t("metadata.keywords.tooltip.content")}
                  ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}
                  classNames={{container: 'mt-3 ml-1'}}/>
          <div className="tags mt-2">
            {generateElements(keywordsExpanded ? item.keywords : item.keywords.slice(0, 12), "tag",
              (keywords) => (
                <Link to={`/?keywords%5B0%5D=${encodeURI(keywords.term.toLowerCase())}`} reloadDocument>
                  {upperFirst(keywords.term)}
                </Link>
              )
            )}
          </div>
          {item.keywords.length > truncatedKeywordsLength && (
            <a className="button is-small is-white"
              onClick={() => {
                setKeywordsExpanded(keywordsExpanded => !keywordsExpanded)
              }}>
              {keywordsExpanded ? (
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
        </section>
      </div>
      <div className="main-content">
        <article className="w-100 mb-2">
          {generateHeading('summary', 'summary-header')}
          <section>
            {generateHeading('title', 'mt-5')}

            <p>{item.titleStudy || t("language.notAvailable.field")}</p>
          </section>

          <section>
            {generateHeading('creator')}
            {generateElements(item.creators, "div")}
          </section>

          <section>
            {generateHeading('pid')}
            {generateElements(item.pidStudies.filter((p) => p.pid), "div",
              (pidStudy) => {
                // The agency field is an optional attribute, only append if present
                if (pidStudy.agency) {
                  return <p key={pidStudy.pid}>{`${pidStudy.pid} (${pidStudy.agency})`}</p>;
                }
                return <p key={pidStudy.pid}>{pidStudy.pid}</p>;
              }
            )}
          </section>

          <section>
            {generateHeading('abstract')}
            {abstractExpanded ? (
              <div
                className="data-abstract"
                dangerouslySetInnerHTML={{ __html: item.abstract }}
              />
            ) : (
              <div className="data-abstract">
                {truncate(striptags(item.abstract), {
                  length: truncatedAbstractLength,
                  separator: " ",
                })}
              </div>
            )}
            {item.abstract.length > truncatedAbstractLength && (
              <a className="button is-small is-white"
                onClick={() => {
                  setAbstractExpanded(abstractExpanded => !abstractExpanded)
                }}>
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
          </section>

          <section>
            {generateHeading('methodology', 'is-inline-flex')}
            <Tooltip content={t("metadata.methodology.tooltip.content")}
                    ariaLabel={t("metadata.methodology.tooltip.ariaLabel")}
                    classNames={{container: 'mt-3 ml-1'}}/>
            {/* <Panel title={<h2>{t("metadata.methodology.label")}</h2>}
                  tooltip={<Tooltip content={<>{t("metadata.methodology.tooltip.content")}</>}
                                    ariaLabel={t("metadata.methodology.tooltip.ariaLabel")}/>}
                  className="classifications"
                  collapsable={false}> */}
            {generateHeading('collPeriod')}
            <>
              {formatDate(
                dateFormatter,
                item.dataCollectionPeriodStartdate,
                item.dataCollectionPeriodEnddate,
                item.dataCollectionFreeTexts
              )}
            </>

            {generateHeading('country')}
            {generateElements(item.studyAreaCountries, "div", (country) => country.country)}

            {generateHeading('timeDimension')}
            {generateElements(item.typeOfTimeMethods, "div", (time) => time.term)}

            {generateHeading('analysisUnit')}
            {generateElements(item.unitTypes, "div", (unit) => unit.term)}

            {generateHeading('universe')}
            {item.universe ? formatUniverse(item.universe) : t("language.notAvailable.field")}

            {generateHeading('sampProc')}
            {generateElements(item.samplingProcedureFreeTexts, "div",
              (text) => (
                <div
                  className="data-abstract"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )
            )}

            {generateHeading('collMode')}
            {generateElements(item.typeOfModeOfCollections, "div", (method) => method.term)}
          </section>
          {/* </Panel> */}

          {/* <Panel
            className="section-header"
            title={<h2>{t("metadata.access")}</h2>}
            collapsable={false}
          > */}
          <section>
            {generateHeading('access')}
            {generateHeading('publisher')}
            <p>{item.publisher ? item.publisher.publisher : t("language.notAvailable.field")}</p>

            {generateHeading('publicationYear')}
            {formatDate(DateTimeFormatter.ofPattern("uuuu"), item.publicationYear)}

            {generateHeading('accessTerms')}
            {generateElements(item.dataAccessFreeTexts, "div",
              (text) => (
                <div
                  className="data-abstract"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )
            )}
          </section>
          {/* </Panel> */}

          {/* <Panel title={<h2>{t("metadata.topics.label")}</h2>}
                  tooltip={<Tooltip content={t("metadata.topics.tooltip.content")}
                                    ariaLabel={t("metadata.topics.tooltip.ariaLabel")}/>}
                  className="classifications"
                  collapsable={false}> */}
          <section>
            {generateHeading('topics', 'is-inline-flex')}
            <Tooltip content={t("metadata.topics.tooltip.content")}
                    ariaLabel={t("metadata.topics.tooltip.ariaLabel")}
                    classNames={{container: 'mt-3 ml-1'}}/>
            <div className="tags mt-2">
              {generateElements(item.classifications, "tag",
                (classifications) => (
                  <Link to={`/?topics%5B0%5D=${encodeURI(classifications.term.toLowerCase())}`} reloadDocument>
                    {upperFirst(classifications.term)}
                  </Link>
                )
              )}
            </div>
          </section>
          {/* </Panel> */}

          {/* <Panel title={<h2>{t("metadata.keywords.label")}</h2>}
                  tooltip={<Tooltip content={t("metadata.keywords.tooltip.content")}
                                    ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}/>}
                  className="keywords"
                  collapsable={false}> */}
          <section>
            {generateHeading('keywords', 'is-inline-flex')}
            <Tooltip content={t("metadata.keywords.tooltip.content")}
                    ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}
                    classNames={{container: 'mt-3 ml-1'}}/>
            <div className="tags mt-2">
              {generateElements(keywordsExpanded ? item.keywords : item.keywords.slice(0, 12), "tag",
                (keywords) => (
                  <Link to={`/?keywords%5B0%5D=${encodeURI(keywords.term.toLowerCase())}`} reloadDocument>
                    {upperFirst(keywords.term)}
                  </Link>
                )
              )}
            </div>
            {item.keywords.length > truncatedKeywordsLength && (
              <a className="button is-small is-white"
                onClick={() => {
                  setKeywordsExpanded(keywordsExpanded => !keywordsExpanded)
                }}>
                {keywordsExpanded ? (
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
          </section>
          {/* </Panel> */}

          {/* <Panel
            className="section-header"
            title={<h2>{t("metadata.relatedPublications")}</h2>}
            collapsable={false}
          > */}
          <section>
            {generateHeading('relPub')}
            {generateElements(
              item.relatedPublications,
              "ul",
              (relatedPublication) => {
                const relatedPublicationTitle = striptags(
                  relatedPublication.title
                );
                if (relatedPublication.holdings?.length > 0) {
                  return (
                    <a href={relatedPublication.holdings[0]}>
                      {relatedPublicationTitle}
                    </a>
                  );
                } else {
                  return relatedPublicationTitle;
                }
              }
            )}
          </section>
          {/* </Panel> */}
        </article>
      </div>
    </div>
    </>
  );
}

export default Detail;
