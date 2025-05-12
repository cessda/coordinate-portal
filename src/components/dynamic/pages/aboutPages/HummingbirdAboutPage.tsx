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

const HummingbirdAboutPage: DynamicAboutPage = ({ metrics }: DynamicAboutPageProps) => {
  const { t } = useTranslation();
  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  return (
    <div className="columns is-flex is-flex-direction-column is-vcentered">
      <Helmet>
        <title>{currentThematicView.title} - About</title>
      </Helmet>
      <div className="column is-flex is-flex-wrap-wrap is-justify-content-space-around is-8">
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
      <div className="column p-6">
        <h1 className="main-title mb-4">About HumMingBird</h1>
        <div className="text-container">
          <h2>Enhanced migration measures from a multidimensional perspective (HumMingBird)</h2>

          <p>
            The project’s overall objective is to improve the understanding of the changing nature of migration flows and the drivers of migration. It will also analyse patterns, motivations, and new geographies. Moreover, HumMingBird aims to calculate population estimates, determine
            emerging and future trends, and identify accordingly possible future implications of today’s policy decisions.

          </p>
          <p>
            The HumMingBird collection in the CESSDA Data Catalogue contains studies on migration topics as a main project deliverable.

          </p>

        </div></div>

    </div>
  );
};

export default HummingbirdAboutPage;
