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
import { Await, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { store } from "../store";
import { updateMetrics } from "../reducers/search";
import { useTranslation } from "react-i18next";
import horizonLogo from '../img/horizon-logo.png';
import cessdaLogo from '../img/cessda-logo.png';
import { updateLanguage } from "../reducers/language";
import { Metrics } from "../../common/metadata";

export const metricsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  if(lang){
    store.dispatch(updateLanguage(lang));
  }
  return await store.dispatch(updateMetrics());
};

interface MetricsCircleProps {
  amount: number;
  description: string;
}

const AboutPage = () => {
  const { t } = useTranslation();
  const metrics = useLoaderData() as ReturnType<typeof metricsLoader>;

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
    <div className="columns is-flex is-flex-direction-column is-vcentered">
      <div className="column is-flex is-flex-wrap-wrap is-justify-content-space-around is-8">
        <React.Suspense fallback={<></>}>
          <Await resolve={metrics} errorElement={<></>}>
            {(metrics: Awaited<ReturnType<typeof metricsLoader>>) => {
              if(metrics.meta.requestStatus === "fulfilled"){
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
      <div className="column is-12">
        <h1 className="main-title mb-4">{t("about.title")}</h1>
        <div className="text-container" dangerouslySetInnerHTML={{ __html: t("about.content") }}/>
      </div>
      <div className="column is-12">
        <div className="columns is-vcentered">
          <div className="column is-6">
            <img src={ horizonLogo } alt={t("about.horizonLogo")} />
            {/* {t("about.funding")} */}
          </div>
          <div className="column is-6">
            <img src={ cessdaLogo } alt={t("about.cessdaLogo")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
