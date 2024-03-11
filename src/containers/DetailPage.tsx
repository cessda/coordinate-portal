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
import { getJsonLd } from '../../common/metadata';
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
  if(lang){
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

  // Get the Elasticsearch index for the current language. Used to pass index to View JSON link.
  // const index = useAppSelector((state) => state.language.currentLanguage.index);

  useEffect(() => {
    // Update the JSON-LD representation
    const jsonLDElement = document.getElementById("json-ld");

    if (data.payload.study) {
      const elementString = '<script id="json-ld" type="application/ld+json">' + JSON.stringify(getJsonLd(data.payload.study)) + '</script>';
      if (jsonLDElement) {
        $(jsonLDElement).replaceWith(elementString);
      } else {
        $(document.body).append(elementString);
      }
    } else {
      if (jsonLDElement) {
        jsonLDElement.remove();
      }
    }
  }, []);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      navigate(-1);
    }
  };

  // Determines the order for index in left side column but not for the actual content
  const headings: HeadingEntry[] = [
    {summary: {id: 'summary-information', level: 'title', translation: t("metadata.summaryInformation")}},
    {title: {id: 'title', level: 'subtitle', translation: t("metadata.studyTitle")}},
    {creator: {id: 'creator', level: 'subtitle', translation: t("metadata.creator")}},
    {pid: {id: 'pid', level: 'subtitle', translation: t("metadata.studyPersistentIdentifier")}},
    {abstract: {id: 'abstract', level: 'subtitle', translation: t("metadata.abstract")}},
    {methodology: {id: 'methodology', level: 'title', translation: t("metadata.methodology.label")}},
    {collPeriod: {id: 'data-collection-period', level: 'subtitle', translation: t("metadata.dataCollectionPeriod")}},
    {country: {id: 'country', level: 'subtitle', translation: t("metadata.country")}},
    {timeDimension: {id: 'time-dimension', level: 'subtitle', translation: t("metadata.timeDimension")}},
    {analysisUnit: {id: 'analysis-unit', level: 'subtitle', translation: t("metadata.analysisUnit")}},
    {universe: {id: 'universe', level: 'subtitle', translation: t("metadata.universe")}},
    {sampProc: {id: 'sampling-procedure', level: 'subtitle', translation: t("metadata.samplingProcedure")}},
    {collMode: {id: 'data-collection-mode', level: 'subtitle', translation: t("metadata.dataCollectionMethod")}},
    {access: {id: 'access', level: 'title', translation: t("metadata.access")}},
    {publisher: {id: 'publisher', level: 'subtitle', translation: t("metadata.publisher")}},
    {publicationYear: {id: 'publication-year', level: 'subtitle', translation: t("metadata.yearOfPublication")}},
    {accessTerms: {id: 'terms-of-data-access', level: 'subtitle', translation: t("metadata.termsOfDataAccess")}},
    {topics: {id: 'topics', level: 'title', translation: t("metadata.topics.label")}},
    {keywords: {id: 'keywords', level: 'title', translation: t("metadata.keywords.label")}},
    {relPub: {id: 'related-publications', level: 'title', translation: t("metadata.relatedPublications")}}
  ]

  return(
    <div className="columns">
      <div className="column is-3 side-column">
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
        <React.Suspense fallback={<p>{t("loader.loading")}</p>}>
          <Await resolve={data} errorElement={<p>{t("loader.error")}</p>}>
            {(data) => {
              return <Similars similars={data.payload.similars ? data.payload.similars : []}/>
            }}
          </Await>
        </React.Suspense>
        <DetailIndex headings={headings}/>
      </div>
      <div className="column is-9">
        <React.Suspense fallback={<p>{t("loader.loading")}</p>}>
          <Await resolve={data} errorElement={<p>{t("loader.error")}</p>}>
            {(data) => {
              if(data.payload.study){
                return <Detail item={data.payload.study} headings={headings}/>
              }
              else {
                const languageLinks: JSX.Element[] = [];

                for (let i = 0; i < data.payload.availableLanguages.length; i++) {
                  const lang = data.payload.availableLanguages[i];
                  languageLinks.push(
                    <Link key={lang.code} to={`${location.pathname}?lang=${lang.code}`}>
                      {lang.label}
                    </Link>
                  );
                }

                return (
                  <div className="pt-15">
                    <p className="fs-14 mb-15">
                      <strong>{t("language.notAvailable.heading")}</strong>
                    </p>
                    <p className="fs-14 mb-15">{t("language.notAvailable.content")}</p>
                    {data.payload.availableLanguages.length > 0 &&
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

// import React, { Component } from 'react';
// import { Layout, LayoutBody, LayoutResults, SearchkitProvider, SideBar } from 'searchkit';
// import Header from '../components/Header';
// import Detail from '../components/Detail';
// import Footer from '../components/Footer';
// import searchkit from '../utilities/searchkit';
// import Panel from '../components/Panel';
// import { connect, Dispatch } from 'react-redux';
// import { FaAngleLeft, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
// import { AnyAction, bindActionCreators } from 'redux';
// import Similars from '../components/Similars';
// import { goBack, push } from 'react-router-redux';
// import type { State } from '../types';
// import { getJsonLd } from '../../common/metadata';
// import { updateStudy } from '../actions/detail';
// import $ from 'jquery';
// import { browserHistory } from 'react-router';
// import { useTranslation } from 'react-i18next';

// export type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

// export class DetailPage extends Component<Props> {

//   constructor(props: Props) {
//     super(props);
//     const id = this.props.query;
//     if (id && id !== this.props.item?.id) {
//       // If the query is set and not already in the store, retrieve it.
//       this.props.updateStudy(id);
//     }
//     this.updateTitle();
//   }

//   componentDidUpdate(prevProps: Props) {
//     // Check if the query has changed, if it has ask for the store to be updated.
//     const id = this.props.query;
//     if (id && id !== prevProps.query) {
//       this.props.updateStudy(id);
//     }
//     this.updateTitle();

//     // Update the JSON-LD representation
//     const jsonLDElement = document.getElementById("json-ld");

//     if (this.props.item) {
//       const elementString = '<script id="json-ld" type="application/ld+json">' + JSON.stringify(getJsonLd(this.props.item)) + '</script>';
//       if (jsonLDElement) {
//         $(jsonLDElement).replaceWith(elementString);
//       } else {
//         $(document.body).append(elementString);
//       }
//     } else {
//       if (jsonLDElement) {
//         jsonLDElement.remove();
//       }
//     }
//   }

//   private updateTitle() {
//     const { t, i18n } = useTranslation();

//     if (this.props.item) {
//       document.title = `${this.props.item.titleStudy} - ${t('datacatalogue')}`;
//     } else {
//       document.title = `${t('language.notAvailable.title')} - ${t('datacatalogue')}`;
//     }
//   }

//   render() {
//     const {
//       item,
//       currentLanguage,
//       goBack,
//       push
//     } = this.props;

//     const { t, i18n } = useTranslation();

//     // Get the Elasticsearch index for the current language. Used to pass index to View JSON link.
//     const index = currentLanguage.index;

//     const languageLinks: JSX.Element[] = [];

//     for (let i = 0; i < this.props.availableLanguages.length; i++) {
//       const lang = this.props.availableLanguages[i];
//       const element = <a key={lang.code} onClick={() => {
//         const currentLocation = browserHistory.getCurrentLocation();
//         push({
//           pathname: currentLocation.pathname,
//           query: {
//             ...currentLocation.query,
//             lang: lang.code
//           }
//         });
//       }}>{lang.label}</a>

//       if (i < this.props.availableLanguages.length - 1) {
//         languageLinks.push(<React.Fragment key={i}>{element}, </React.Fragment>)
//       } else {
//         languageLinks.push(element);
//       }
//     }

//     return (
//       <SearchkitProvider searchkit={searchkit}>
//         <Layout>
//           <Header/>
//           <div className="container mb-3">
//           <LayoutBody className="columns">
//             <SideBar className="is-hidden-mobile column is-4">
//               <Panel title={t("similarResults.heading")}
//                      collapsable={true}
//                      defaultCollapsed={false}>
//                 <Similars/>
//               </Panel>
//             </SideBar>
//             <LayoutResults className="column is-8">
//             {item ?
//               <>
//                 <div className="panel">
//                   <a className="button is-small is-white is-pulled-right" onClick={goBack}>
//                     <FaAngleLeft/><span className="ml-5">{t("back")}</span>
//                   </a>

//                   {item.studyUrl &&
//                   <a className="button is-small is-white is-pulled-left"
//                       href={item.studyUrl}
//                       rel="noreferrer"
//                       target="_blank">
//                     <span className="icon is-small"><FaExternalLinkAlt/></span>
//                     <span>{t("goToStudy")}</span>
//                   </a>
//                   }

//                   <a className="button is-small is-white is-pulled-left"
//                     href={`/api/json/${index}/${encodeURIComponent(item.id)}`}
//                     rel="noreferrer"
//                     target="_blank">
//                   <span className="icon is-small"><FaCode/></span>
//                   <span>{t("viewJson")}</span>
//                   </a>

//                   <div className="is-clearfix"/>
//                 </div>
//                 <Detail item={item}/>
//               </>
//             :
//               <div className="panel pt-15">
//                 <p className="fs-14 mb-15">
//                   <strong>{t("language.notAvailable.heading")}</strong>
//                 </p>
//                 <p className="fs-14 mb-15">{t("language.notAvailable.content")}</p>
//                 {this.props.availableLanguages.length > 0 &&
//                   <p className="fs-14 mb-15">{t("language.notAvailable.alternateLanguage")}: {languageLinks}</p>
//                 }
//               </div>
//             }
//             </LayoutResults>
//           </LayoutBody>
//           </div>
//           <Footer/>
//         </Layout>
//       </SearchkitProvider>
//     );
//   }
// }

// export function mapStateToProps(state: State) {
//   const query = state.routing.locationBeforeTransitions.query.q;
//   return {
//     item: state.detail.study,
//     currentLanguage: state.language.currentLanguage,
//     availableLanguages: state.detail.languageAvailableIn,
//     query: Array.isArray(query) ? query.join() : query
//   };
// }

// export function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
//   return {
//     goBack: bindActionCreators(goBack, dispatch),
//     updateStudy: bindActionCreators(updateStudy, dispatch),
//     push: bindActionCreators(push, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
