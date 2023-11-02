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

import React from "react";
import { Await, LoaderFunction, useLoaderData } from "react-router-dom";
import { store } from "../store";
import { updateMetrics } from "../reducers/search";
import { useTranslation } from "react-i18next";
import horizonLogo from '../img/horizon-logo.png';
import cessdaLogo from '../img/cessda-logo.png';

export const metricsLoader: LoaderFunction = async () => {
  const metrics = await store.dispatch(updateMetrics());
  return { metrics };
};

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const { metrics } = useLoaderData() as ReturnType<typeof metricsLoader>;

  console.log()

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
    <div className="columns is-flex is-flex-direction-column is-vcentered">
      <div className="column is-flex is-flex-wrap-wrap is-justify-content-space-around is-8">
        <React.Suspense fallback={<p>Loading metrics...</p>}>
          <Await resolve={metrics} errorElement={<p>Error loading metrics</p>}>
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
                return <p>Unable to retrieve metrics, try again later</p>
              }
            }}
          </Await>
        </React.Suspense>
      </div>
      <div className="column is-12">
        <h1 className="main-title mb-4">{t("about.title")}</h1>
        <div className="about-container" dangerouslySetInnerHTML={{ __html: t("about.content") }}/>
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

// import React, { Component } from 'react';
// import { Layout, LayoutBody, LayoutResults, SearchkitProvider } from 'searchkit';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import searchkit from '../utilities/searchkit';
// import { connect } from 'react-redux';
// import { useTranslation } from 'react-i18next';

// export class AboutPage extends Component {

//   componentDidMount() {
//     const { t, i18n } = useTranslation();
//     document.title = `${t('about.label')} - ${t('datacatalogue')}`;

//     // Remove the JSON-LD representation if present
//     const jsonLDElement = document.getElementById("json-ld");
//     if (jsonLDElement) {
//       jsonLDElement.remove();
//     }
//   }

//   render() {
//     const { t, i18n } = useTranslation();
//     return (
//       <SearchkitProvider searchkit={searchkit}>
//         <Layout>
//           <Header/>
//           <div className="container">
//           <LayoutBody className="columns">
//             <LayoutResults>
//               <article className="about-container">
//                 <h1 className="about-title">{t("about.label")}</h1>
//                 {t("about.content")}
//               </article>
//             </LayoutResults>
//           </LayoutBody>
//           </div>
//           <Footer/>
//         </Layout>
//       </SearchkitProvider>
//     );
//   }
// }

// export default connect()(AboutPage);
