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
import { useTranslation } from "react-i18next";

const RestApiPage = () => {
  const { t } = useTranslation();

  return (
<div className="columns">
<div className="content-wrapper column is-three-fifths is-offset-one-fifth mt-6 p-6">
        <h1 className="main-title mb-4">{t("api.label")}</h1>
        <div className="text-container" dangerouslySetInnerHTML={{ __html: t("api.content") }}/>
        <ul>
          <li><a href="/api/DataSets/v2/search?keywords=smoking&metadataLanguage=en">{window.location.origin}/api/DataSets/v2/search?keywords=smoking&metadataLanguage=en</a></li>
        </ul>
      </div>
    </div>
  );
};

export default RestApiPage;
