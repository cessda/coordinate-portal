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
import { store } from "../store";
import { updateMetrics } from "../reducers/search";
import { useAppSelector } from "../hooks";

const aboutPages = {
  cdc: require('../components/dynamic/pages/aboutPages/CdcAboutPage.tsx').default,
  coordinate: require('../components//dynamic/pages/aboutPages/CoordinateAboutPage.tsx').default,
  hummingbird: require('../components//dynamic/pages/aboutPages/HummingbirdAboutPage.tsx').default,
};

export const metricsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
 /* const lang = url.searchParams.get("lang");
  if(lang){
    store.dispatch(updateLanguage(lang));
  } */
  const metrics = await store.dispatch(updateMetrics());
  return { metrics };
};

const AboutPage = () => {
  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  const DynamicAboutPage = aboutPages[currentThematicView.key as keyof typeof aboutPages];

  return (
    <DynamicAboutPage />
  );
};

export default AboutPage;
