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

import React, { useEffect } from "react";
import Detail from "../components/Detail"
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { updateStudy } from "../reducers/detail";
import { Await, Link, LoaderFunction, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { store } from "../store";
import DetailIndex from "../components/DetailIndex";
import { Funding, getJsonLd } from '../../common/metadata';
import Similars from "../components/Similars";
import { FaAngleLeft } from "react-icons/fa";
import { updateLanguage } from "../reducers/language";

type Heading = {
  id: string;
  translation: string;
  level: 'main' | 'title' | 'subtitle';
};

export type HeadingEntry = {
  [key: string]: Heading
};

export const studyLoader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  if (lang) {
    store.dispatch(updateLanguage(lang));
  }
  const data = await store.dispatch(updateStudy(`${params.id}`));
  return { data };
};

const DetailPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useLoaderData() as ReturnType<typeof studyLoader>;

  useEffect(() => {
    // Update the JSON-LD representation
    const jsonLDElement = document.getElementById("json-ld");
  
    if (data?.payload?.study) {
      const script = document.createElement("script");
      script.id = "json-ld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(getJsonLd(data.payload.study));
  
      if (jsonLDElement) {
        jsonLDElement.replaceWith(script);
      } else {
        document.body.appendChild(script);
      }
    } else {
      if (jsonLDElement) {
        jsonLDElement.remove();
      }
    }
  }, [data]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      navigate(-1);
    }
  };

  function addFundingEntries(fundingArray: Funding[]): HeadingEntry[] {
    const fundingHeadings: HeadingEntry[] = [];
    if (fundingArray.length > 0) {
      // Add the main 'Funding' title once
      fundingHeadings.push({ funding: { id: 'funding', level: 'title', translation: t('metadata.funding') } });

      // Add each funding item found
      fundingArray.forEach((fundingItem, index) => {
        if (fundingItem.agency) {
          fundingHeadings.push({
            [`funder-${index}`]: {
              id: `funder-${index}`,
              level: 'subtitle',
              translation: t('metadata.funder'),
            },
          });
        }

        if (fundingItem.grantNumber) {
          fundingHeadings.push({
            [`grantNumber-${index}`]: {
              id: `grant-number-${index}`,
              level: 'subtitle',
              translation: t('metadata.grantNumber'),
            },
          });
        }
      });
    }
    return fundingHeadings;
  }

  // Determines the order for index in left side column but not for the actual content
  const headings: HeadingEntry[] = [
    { summary: { id: 'summary-information', level: 'title', translation: t("metadata.summaryInformation") } },
    { title: { id: 'title', level: 'subtitle', translation: t("metadata.studyTitle") } },
    { creator: { id: 'creator', level: 'subtitle', translation: t("metadata.creator") } },
    { pid: { id: 'pid', level: 'subtitle', translation: t("metadata.studyPersistentIdentifier") } },
    { abstract: { id: 'abstract', level: 'subtitle', translation: t("metadata.abstract") } },
    { methodology: { id: 'methodology', level: 'title', translation: t("metadata.methodology.label") } },
    { collPeriod: { id: 'data-collection-period', level: 'subtitle', translation: t("metadata.dataCollectionPeriod") } },
    { country: { id: 'country', level: 'subtitle', translation: t("metadata.country") } },
    { timeDimension: { id: 'time-dimension', level: 'subtitle', translation: t("metadata.timeDimension") } },
    { analysisUnit: { id: 'analysis-unit', level: 'subtitle', translation: t("metadata.analysisUnit") } },
    { universe: { id: 'universe', level: 'subtitle', translation: t("metadata.universe") } },
    { sampProc: { id: 'sampling-procedure', level: 'subtitle', translation: t("metadata.samplingProcedure") } },
    { dataKind: { id: 'data-kind', level: 'subtitle', translation: t("metadata.dataKind") } },
    { collMode: { id: 'data-collection-mode', level: 'subtitle', translation: t("metadata.dataCollectionMethod") } },
    ...addFundingEntries(data?.payload?.study?.funding.length > 0 ? data.payload.study.funding : []),
    { access: { id: 'access', level: 'title', translation: t("metadata.access") } },
    { publisher: { id: 'publisher', level: 'subtitle', translation: t("metadata.publisher") } },
    { publicationYear: { id: 'publication-year', level: 'subtitle', translation: t("metadata.yearOfPublication") } },
    { accessTerms: { id: 'terms-of-data-access', level: 'subtitle', translation: t("metadata.termsOfDataAccess") } },
    { topics: { id: 'topics', level: 'title', translation: t("metadata.topics.label") } },
    { keywords: { id: 'keywords', level: 'title', translation: t("metadata.keywords.label") } },
    { relPub: { id: 'related-publications', level: 'title', translation: t("metadata.relatedPublications") } }
  ]

  return (
    <div className="columns">
      <div className="column is-3 side-column">
        {location.state?.from === "/" &&
          <a className="button no-border focus-visible pl-0 mb-2"
            tabIndex={0}
            onClick={() => navigate(-1)}
            onKeyDown={(e) => handleKeyDown(e)}
            data-testid="back-button">
            <span className="icon is-small">
              <FaAngleLeft />
            </span>
            <span>{t("backToSearch")}</span>
          </a>
        }
        <React.Suspense fallback={<p>{t("loader.loading")}</p>}>
          <Await resolve={data} errorElement={<p>{t("loader.error")}</p>}>
            {(resolvedData) => {
              return <Similars similars={resolvedData?.payload?.similars ? resolvedData.payload.similars : []} />
            }}
          </Await>
        </React.Suspense>
        <DetailIndex headings={headings} />
      </div>
      <div className="column is-9">
        <React.Suspense fallback={<p data-testid="loading">{t("loader.loading")}</p>}>
          <Await resolve={data} errorElement={<p>{t("loader.error")}</p>}>
            {(resolvedData) => {
              if (resolvedData?.payload?.study) {
                return <Detail item={resolvedData.payload.study} headings={headings} />
              }
              else {
                const languageLinks: JSX.Element[] = [];

                for (let i = 0; i < resolvedData?.payload?.availableLanguages.length; i++) {
                  const lang = resolvedData.payload.availableLanguages[i];
                  languageLinks.push(
                    <Link key={lang.code} to={`${location.pathname}?lang=${lang.code}`}>
                      {lang.label}
                    </Link>
                  );
                }

                return (
                  <div className="pt-15" data-testid="available-languages">
                    <p className="fs-14 mb-15">
                      <strong>{t("language.notAvailable.heading")}</strong>
                    </p>
                    <p className="fs-14 mb-15">{t("language.notAvailable.content")}</p>
                    {languageLinks.length > 0 &&
                      <p className="fs-14 mb-15">{t("language.notAvailable.alternateLanguage")}:{" "}
                        {languageLinks.map((link, index) => (
                          <React.Fragment key={index}>
                            {link}
                            {index < languageLinks.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </p>
                    }
                  </div>
                )
              }
            }}
          </Await>
        </React.Suspense>
      </div>
    </div>
  )
};

export default DetailPage;
