// Copyright CESSDA ERIC 2017-2025
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
import { Await } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Metrics } from "../../../../../common/metadata";
import { useAppSelector } from "../../../../hooks";
import { metricsLoader } from "../../../../containers/AboutPage";
import { DynamicAboutPage, DynamicAboutPageProps } from "./DynamicAboutPage";
import { MetricsCircle } from "./MetricsCircle";

const CdcAboutPage: DynamicAboutPage = ({ metrics }: DynamicAboutPageProps) => {
  const { t } = useTranslation();

  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  return (
    <div className="columns is-flex is-flex-direction-column is-vcentered pb-6">
      <Helmet>
        <title>{currentThematicView.title} - About</title>
      </Helmet>
      <div className="column is-flex is-flex-wrap-wrap is-justify-content-space-around">
        <React.Suspense fallback={<></>}>
          <Await resolve={metrics} errorElement={<></>}>
            {(metrics: Awaited<ReturnType<typeof metricsLoader>>) => {
              if (metrics.meta.requestStatus === "fulfilled") {
                const payload = metrics.payload as Metrics;
                return (
                  <>
                    <MetricsCircle amount={payload.studies} description={t("about.metrics.studies")} />
                    <MetricsCircle amount={payload.creators} description={t("about.metrics.creators")} />
                    <MetricsCircle amount={payload.countries} description={t("about.metrics.countries")} />
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
      <div className="column px-6">
        <h1 className="main-title mb-4">About the CESSDA Data Catalogue</h1>
        <div className="text-container">
          <p>This is the CESSDA Data Catalogue (CDC) version 3.7.0 released on 2024-11-12. It contains descriptions of the more than 40,000 data collections held by CESSDA’s Service Providers (SPs), originating from over 20 European countries. The CDC is a one-stop shop for searching and discovering European social science data. The presented data includes a range of data types including quantitative, qualitative or mixed-modes data, covering both cross-sectional and longitudinal studies, as well as recently collected and historical data. The metadata (study descriptions) are presented in the language as originally provided by the organisations producing the metadata. Some publishers provide study descriptions both in English and in the local language, some only in either English or in the local language. Currently, about 75% of study descriptions are available in English.</p><p>The <a href="/documentation/">User Guide</a> presents an overview of how to use the data catalogue for searching, covering basic search operations, application of filters and advanced search functionalities.</p><p>The CDC is a portal for discovering data and detailed dataset descriptions are provided. For information and procedures on how to access data, there is a link [‘Access data’] from each study to the study information on the website of the data provider (Publisher). Refer to the information found there to see which access conditions apply to data created in the particular study.</p><p>There is also an <a href="https://www.openarchives.org/pmh/">OAI-PMH compliant endpoint</a>, so that data aggregators can easily harvest the entire contents of the data catalogue. Record identifiers are unified with those used in the User Interface. It is located at <a href="https://datacatalogue.cessda.eu/oai-pmh/v0/oai?verb=Identify"> https://datacatalogue.cessda.eu/oai-pmh/v0/oai</a>.</p><p>There is also a search API. Documentation is available at the <a href="https://api.tech.cessda.eu/">public REST APIs for CESSDA Services</a> page.</p><h2>Changes since the last version</h2><ul><li>Added aggregated information on Data Access</li><li>Added multiple new information elements: Kind of data, Funding and Series information, and Creator identifiers</li><li>Added HumMingBird records</li></ul>
        </div>
      </div>

    </div>

  );
};

export default CdcAboutPage;
