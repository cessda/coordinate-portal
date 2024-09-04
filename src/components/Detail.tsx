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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { truncate, upperFirst } from "lodash";
import {
  CMMStudy,
  Creator,
  DataCollectionFreeText,
  DataKindFreeText,
  getDDI,
  TermVocabAttributes,
  Universe,
} from "../../common/metadata";
import {
  ChronoField,
  DateTimeFormatter,
  DateTimeFormatterBuilder,
} from "@js-joda/core";
import { FaAngleDown, FaAngleUp, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import Tooltip from "./Tooltip";
import { HeadingEntry } from "../containers/DetailPage";
import Select from 'react-select';
import { useAppSelector } from "../hooks";

export interface Props {
  item: CMMStudy;
  headings: HeadingEntry[];
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
  const { t } = useTranslation();
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);

  const item = props.item;
  const headings = props.headings;
  const truncatedAbstractLength = 2000;
  const truncatedKeywordsLength = 12;

  const [abstractExpanded, setAbstractExpanded] = useState(props.item.abstract.length < truncatedAbstractLength);
  const [infoBoxExpanded, setInfoBoxExpanded] = useState(props.item.keywords.length < truncatedKeywordsLength);
  const [keywordsExpanded, setKeywordsExpanded] = useState(props.item.keywords.length < truncatedKeywordsLength);
  const [selectedExportMetadataOption, setSelectedExportMetadataOption] = useState<Option | null>(null);
  const [selectedExportCitationOption, setSelectedExportCitationOption] = useState<Option | null>(null);

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
    const lang = currentLanguage.code;

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
      return <span>{t("language.notAvailable.field")}</span>;
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
    const { t } = useTranslation();
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
          const jsonResponse = await fetch(`${window.location.origin}/api/json/${currentLanguage.index}/${encodeURIComponent(item.id)}`);

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

  /**
   * Formats the given creator inside span element with as much information as possible, preferably
   * creator name, creator affiliation and research identifier. Research identifier will also include
   * the specific type and hyperlink for uri when they available. Hyperlink text is usually id but can
   * be uri if id is empty but uri still exists. Minimum value for creator is the creator name.
   *
   * @param creator the creator to format
   * @returns formatted creator in span element
   */
  const formatCreator = (creator: Creator) => {
    const creatorFormatted = (
      <span data-testid="creator">
        {creator.name}
        {creator.affiliation && ` (${creator.affiliation})`}
        {creator.identifier && (
          <>
            {" - "}
            {creator.identifier.type ? creator.identifier.type : "Research Identifier"}
            {": "}
            {creator.identifier.uri ? (
              <a href={creator.identifier.uri} target="_blank" rel="noreferrer">
                <span className="icon"><FaExternalLinkAlt /></span>
                {creator.identifier.id ? creator.identifier.id : creator.identifier.uri}
              </a>
            ) : (
              creator.identifier.id
            )}
          </>
        )}
      </span>
    );
    return creatorFormatted;
  }

  /**
   * Formats the given dataKindFreeTexts and generalDataFormats into the same array
   * with all free texts, types and formats combined while removing duplicates.
   * Array contains types first, general data formats second and free texts last.
   *
   * @param dataKindFreeTexts the data kind free texts and types to format
   * @param generalDataFormats the general data formats to format
   * @returns the formatted data kind free texts, types and formats in one array
   */
  const formatDataKind = (dataKindFreeTexts: DataKindFreeText[], generalDataFormats: TermVocabAttributes[]): string[] => {
    const uniqueValues = new Set<string>();
    dataKindFreeTexts.forEach(({ type }) => {
      if (type) uniqueValues.add(type);
    });
    generalDataFormats.forEach(item => uniqueValues.add(item.term));
    dataKindFreeTexts.forEach(({ dataKindFreeText }) => {
      if (dataKindFreeText) uniqueValues.add(dataKindFreeText);
    });
    return Array.from(uniqueValues);
  }

  return (
    <>
    <div className="columns is-vcentered">
      <div className="column is-2 px-1 py-3">
        <div className="columns is-flex-direction-column">
          <div className="column px-0 pt-0 pb-1">
            {item.studyUrl && (
              <a className="is-inline-flex"
                href={item.studyUrl}
                rel="noreferrer"
                target="_blank">
                <span className="icon mt-1 mr-1">
                  <FaExternalLinkAlt />
                </span>
                <span className="large-text">{t("goToStudy")}</span>
              </a>
            )}
          </div>
          <div className="column px-0 pt-1 pb-0">
            <a className="is-inline-flex"
              href={`/api/json/${currentLanguage.index}/${encodeURIComponent(item.id)}`}
              rel="noreferrer"
              target="_blank">
              <span className="icon is-small ml-1 mt-1 mr-1"><FaCode/></span>
              <span>{t("viewJson")}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="column is-5 px-1 py-3">
        <div className="columns is-flex is-flex-wrap-wrap is-vcentered is-centered">
          <div className="column is-flex is-flex-grow-0 is-narrow py-0 pl-0 pr-1">
            <span className="is-inline-flex">{t("exportMetadata")}</span>
            {/* <Tooltip content={t("metadata.keywords.tooltip.content")}
                    ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}
                    classNames={{container: 'ml-1'}}/> */}
          </div>
          <div className="column is-flex is-flex-grow-0 is-narrow p-0">
            <Select options={exportMetadataOptions}
                    defaultValue={{ value: '', label: ''}}
                    onChange={handleExportMetadataChange}
                    className="export-select"
                    aria-label="Export metadata" />
          </div>
          <div className="column is-flex is-flex-grow-0 is-narrow p-0">
            <button className="button is-info is-light" onClick={handleExportMetadata} data-testid="export-metadata-button"
                    disabled={!selectedExportMetadataOption || selectedExportMetadataOption.value.trim() === ''}>
              {t("export")}
            </button>
          </div>
        </div>
      </div>
      <div className="column is-5 px-1 py-3">
        <div className="columns is-flex is-flex-wrap-wrap is-vcentered is-centered">
          <div className="column is-flex is-flex-grow-0 is-narrow py-0 pl-0 pr-1">
            <span className="is-inline-flex">{t("exportCitation")}</span>
            {/* <Tooltip content={t("metadata.keywords.tooltip.content")}
                    ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}
                    classNames={{container: 'ml-1'}}/> */}
          </div>
          <div className="column is-flex is-flex-grow-0 is-narrow p-0">
            <Select options={exportCitationOptions}
                    defaultValue={{ value: '', label: ''}}
                    onChange={handleExportCitationChange}
                    className="export-select"
                    aria-label="Export citation" />
          </div>
          <div className="column is-flex is-flex-grow-0 is-narrow p-0">
            <button className="button is-info is-light" data-testid="export-citation-button"
                    onClick={() => alert("Not yet implemented")}
                    // onClick={handleExportCitation}
                    disabled={!selectedExportCitationOption || selectedExportCitationOption.value.trim() === ''}>
              {t("export")}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="metadata-container">
      <div className="info-box is-hidden-touch" data-testid="info-box">
        <section className="info-box-topics">
          {generateHeading('topics', 'is-inline-flex mt-0', 'info-box-topics')}
          <Tooltip content={t("metadata.topics.tooltip.content")}
                  ariaLabel={t("metadata.topics.tooltip.ariaLabel")}
                  classNames={{container: 'mt-10-negative ml-1'}}/>
          <div className="tags mt-2">
            {generateElements(item.classifications, "tag",
              (classifications) => (
                <Link to={`/?sortBy=${currentLanguage.index}&classifications%5B0%5D=${encodeURI(classifications.term.toLowerCase())}`}>
                  {upperFirst(classifications.term)}
                </Link>
              )
            )}
          </div>
        </section>
        <section className="info-box-keywords">
          {generateHeading('keywords', 'is-inline-flex', 'info-box-keywords')}
          <Tooltip content={t("metadata.keywords.tooltip.content")}
                  ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}
                  classNames={{container: 'mt-1 ml-1'}}/>
          <div className="tags mt-2">
            {generateElements(infoBoxExpanded ? item.keywords : item.keywords.slice(0, 12), "tag",
              (keywords) => (
                <Link to={`/?sortBy=${currentLanguage.index}&keywords%5B0%5D=${encodeURI(keywords.term.toLowerCase())}`}>
                  {upperFirst(keywords.term)}
                </Link>
              )
            )}
          </div>
          {item.keywords.length > truncatedKeywordsLength && (
            <a className="button is-small is-white" data-testid="expand-info-box"
              onClick={() => {
                setInfoBoxExpanded(infoBoxExpanded => !infoBoxExpanded)
              }}>
              {infoBoxExpanded ? (
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
          <section className="metadata-section">
            {generateHeading('summary', 'summary-header')}

            {generateHeading('title', 'mt-5')}
            <p>{item.titleStudy || t("language.notAvailable.field")}</p>

            {generateHeading('creator')}
            {generateElements(item.creators, 'div', creator => {
              return formatCreator(creator);
            })}

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
              <a className="button is-small is-white" data-testid="expand-abstract"
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

          <section className="metadata-section">
            {generateHeading('methodology', 'is-inline-flex')}
            <Tooltip content={t("metadata.methodology.tooltip.content")}
                    ariaLabel={t("metadata.methodology.tooltip.ariaLabel")}
                    classNames={{container: 'mt-1 ml-1'}}/>
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
            {item.universe ? formatUniverse(item.universe) : <span>{t("language.notAvailable.field")}</span>}

            {generateHeading('sampProc')}
            {generateElements(item.samplingProcedureFreeTexts, "div",
              (text) => (
                <div
                  className="data-abstract"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )
            )}

            {generateHeading('dataKind')}
            {item.dataKindFreeTexts || item.generalDataFormats ? generateElements(formatDataKind(item.dataKindFreeTexts, item.generalDataFormats), 'div', text =>
              <div className="data-abstract" dangerouslySetInnerHTML={{ __html: text }} data-testid="data-kind"/>
            ) : <span>{t("language.notAvailable.field")}</span>}

            {generateHeading('collMode')}
            {generateElements(item.typeOfModeOfCollections, "div", (method) => method.term)}
          </section>

          {item.funding.length > 0 &&
            <section className="metadata-section" data-testid='funding'>
              {generateHeading('funding', 'is-inline-flex')}
              {item.funding.map(funding => (
              <React.Fragment key={`${funding.agency || ''}${funding.grantNumber || ''}`}>
                {funding.agency &&
                  <>
                    {generateHeading('funder')}
                    <p lang={currentLanguage.code}>
                      {funding.agency}
                    </p>
                  </>
                }
                {funding.grantNumber &&
                  <>
                    {generateHeading('grantNumber')}
                    <p lang={currentLanguage.code}>
                      {funding.grantNumber}
                    </p>
                  </>
                }
              </React.Fragment>
            ))}
            </section>
          }

          <section className="metadata-section">
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

          <section className="metadata-section">
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

          <section className="metadata-section">
            {generateHeading('topics', 'is-inline-flex')}
            <Tooltip content={t("metadata.topics.tooltip.content")}
                    ariaLabel={t("metadata.topics.tooltip.ariaLabel")}
                    classNames={{container: 'mt-1 ml-1'}}/>
            <div className="tags mt-2">
              {generateElements(item.classifications, "tag",
                (classifications) => (
                  <Link to={`/?sortBy=${currentLanguage.index}&classifications%5B0%5D=${encodeURI(classifications.term.toLowerCase())}`}>
                    {upperFirst(classifications.term)}
                  </Link>
                )
              )}
            </div>
          </section>

          <section className="metadata-section">
            {generateHeading('keywords', 'is-inline-flex')}
            <Tooltip content={t("metadata.keywords.tooltip.content")}
                    ariaLabel={t("metadata.keywords.tooltip.ariaLabel")}
                    classNames={{container: 'mt-1 ml-1'}}/>
            <div className="tags mt-2">
              {generateElements(keywordsExpanded ? item.keywords : item.keywords.slice(0, 12), "tag",
                (keywords) => (
                  <Link to={`/?sortBy=${currentLanguage.index}&keywords%5B0%5D=${encodeURI(keywords.term.toLowerCase())}`}>
                    {upperFirst(keywords.term)}
                  </Link>
                )
              )}
            </div>
            {item.keywords.length > truncatedKeywordsLength && (
              <a className="button is-small is-white" data-testid="expand-keywords"
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
        </article>
      </div>
    </div>
    </>
  );
}

export default Detail;
