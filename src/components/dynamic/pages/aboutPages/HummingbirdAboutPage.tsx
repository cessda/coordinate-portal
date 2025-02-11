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
import { Await } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Metrics } from "../../../../../common/metadata";
import { useAppSelector } from "../../../../hooks";
import { metricsLoader } from "../../../../containers/AboutPage";

type DynamicAboutPageProps = {
  metrics: Awaited<ReturnType<typeof metricsLoader>>;
};

const DynamicAboutPage: React.FC<DynamicAboutPageProps> = ({ metrics }) => {
  const { t } = useTranslation();

  type MetricsCircleProps = {
    amount: number;
    description: string;
  };
 const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  const MetricsCircle: React.FC<MetricsCircleProps> = ({ amount, description }) => {
    return (
      <div className="columns is-flex is-flex-direction-column is-vcentered mb-0">
            <Helmet>
                      <title>{currentThematicView.title} - About</title>
                      </Helmet>
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
      <div className="column p-6">
        <h1 className="main-title mb-4">About HumMingBird</h1>
        <div className="text-container">
        <h2>Hummingbird About page</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus ligula ut lectus fermentum sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum venenatis tellus. Curabitur sed elit quam. Suspendisse consectetur quis lorem nec dictum. Ut vitae massa fringilla, ornare nunc vel, scelerisque mi. Nam arcu nibh, mollis quis rhoncus a, porttitor in mauris. In a pharetra risus. Proin scelerisque massa sed risus elementum, id placerat dolor ullamcorper. Nulla bibendum scelerisque nisi, sed eleifend nisl auctor non.</p>

<p>Vivamus a nulla at odio vehicula tincidunt elementum vel nisi. Nunc placerat odio pulvinar libero sodales viverra. Etiam eu dolor ipsum. In elementum fermentum ullamcorper. Vivamus non magna egestas, rhoncus enim nec, fringilla leo. Maecenas sed arcu vel nunc rhoncus tincidunt. Maecenas orci orci, pretium ut placerat sit amet, accumsan nec risus.</p>
</div></div>
     
    </div>
  );
};

export default DynamicAboutPage;
