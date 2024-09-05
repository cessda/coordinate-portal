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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Similar } from "../../common/metadata";
import { useAppSelector } from "../hooks";

export interface Props {
  similars: Similar[];
}

const Similars = (props: Props) => {
  const { t } = useTranslation();
  const similars = props.similars;
  const currentLanguageCode = useAppSelector((state) => state.language.currentLanguage.code);

  const links: JSX.Element[] = [];

  for (let i = 0; i < similars.length; i++) {
    // Construct the similar URL
    links.push(
      <Link key={i} to={"/detail/" + similars[i].id} className="subtitle" lang={currentLanguageCode}>
        {similars[i].title}
      </Link>
    );
  }

  return (
    <div className="similars">
      <h2 className="main mb-2">{t("similarResults.heading")}</h2>
      {links.length > 0 ? (
        <ul className="mb-4">
          {links.map((link, index) => (
            <li key={index} className="mb-1">
              {link}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mb-4">
          <li>
            <p>{t("similarResults.notAvailable")}</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Similars;
