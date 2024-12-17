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

import React from "react";
import { Await, LoaderFunction, useLoaderData } from "react-router-dom";
import { store } from "../../../../store";
import { updateMetrics } from "../../../../reducers/search";
import { useTranslation } from "react-i18next";
import horizonLogo from '../../../../img/horizon-logo.png';

export const metricsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
 /* const lang = url.searchParams.get("lang");
  if(lang){
    store.dispatch(updateLanguage(lang));
  } */
  const metrics = await store.dispatch(updateMetrics());
  return { metrics };
};

const DynamicAboutPage = () => {
  const { t } = useTranslation();
  const { metrics } = useLoaderData() as ReturnType<typeof metricsLoader>;

  type MetricsCircleProps = {
    amount: number;
    description: string;
  };

  const MetricsCircle: React.FC<MetricsCircleProps> = ({ amount, description }) => {
    return (
      <div className="columns is-flex is-flex-direction-column is-vcentered mb-0">
        <div className="metrics-circle m-2">
          <span className="metrics-circle-text">{amount}</span>
        </div>
        <div className="metrics-description">{description}</div>
      </div>
    );
  };

  return (
    <div className="columns is-flex is-flex-direction-column is-vcentered pb-6">
      <div className="column is-flex is-flex-wrap-wrap is-justify-content-space-around is-8">
    
        <React.Suspense fallback={<></>}>
          <Await resolve={metrics} errorElement={<></>}>
            {(metrics) => {
              if(metrics.payload){
                return (
                  <>
                    <MetricsCircle amount={metrics.payload.studies} description={t("about.metrics.studies")} />
                    <MetricsCircle amount={metrics.payload.creators} description={t("about.metrics.creators")} />
                    <MetricsCircle amount={metrics.payload.countries} description={t("about.metrics.countries")} />
                  </>
                );
              }
              else {
                return <></>
              }
            }}
          </Await>
        </React.Suspense>
      </div>
      <div className="column is-8">
        <h1 className="main-title mb-4">About the COORDINATE Portal</h1>
      
        <div className="text-container">
          <p>The aim of the COORDINATE project is to mobilise the community of researchers and organisations that will drive forwards the coordinated development of comparative birth cohort panel and associated survey research in Europe which focus on children's wellbeing.</p>
          <p>The infrastructural community network brought together by COORDINATE will promote the harmonisation of and improve access to international survey data, in particular panel survey data, in the study of children and young people's wellbeing as they grow up.</p>
          <p>The research that COORDINATE will complete, using a child-centric approach, continues the research initiated in the <a href="https://cordis.europa.eu/project/id/613368" target="_blank" rel="noreferrer">'Measuring Youth Well-Being' (MyWEB)</a> and the <a href="https://cordis.europa.eu/project/id/777449" target="_blank" rel="noreferrer">'European Cohort Development Project' (ECDP)</a> projects, which will support elements of the preparatory phase of Europe's first cross-national accelerated birth cohort survey of child well-being: - Growing Up in Digital Europe (GUIDE).</p>
          <p>The COORDINATE Portal has partly been built using <a href="https://datacatalogue.cessda.eu" target="_blank" rel="noreferrer">CESSDA Data Catalogue</a> codebases, namely <a href="https://github.com/cessda/cessda.cdc.searchkit" target="_blank" rel="noreferrer">cessda.cdc.searchkit</a>, <a href="https://github.com/cessda/cessda.metadata.harvester" target="_blank" rel="noreferrer">cessda.metadata.harvester</a> and <a href="https://github.com/cessda/cessda.cdc.osmh-indexer.cmm" target="_blank" rel="noreferrer">cessda.cdc.osmh-indexer.cmm</a>. They are licensed with <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noreferrer">Apache License 2.0</a>.
          </p>
          <p>This portal is still a work in progress. Only this early demo version will be hosted on this domain so the address will change when the final version is released.</p>
          <p>Some features haven't been implemented yet and any implemented features or looks are subject to change.</p>
          <p>Non-exhaustive list of things still being worked on:</p>
          <ul>
            <li>User Guide</li>
            <li>Display data access (open or restricted)</li>
            <li>Improved filtering of relevant datasets</li>
            <li>Improved accessibility</li>
            <li>Metadata export in more formats</li>
            <li>Citation export</li>
            <li>Improved responsiveness</li>
            <li>More search facets</li>
            </ul>
            <img src={ horizonLogo } alt="Horizon 2020" className="servicelogo mt-4" />
        </div>
      </div>

      </div>

  );
};

export default DynamicAboutPage;
