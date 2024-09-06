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
import { useTranslation } from "react-i18next";
import { Pagination as InstantsearchPagination } from "react-instantsearch";

const Pagination = () => {
  const { t } = useTranslation();

  return (
    <InstantsearchPagination
      showLast
      translations={{
        previousPageItemText: '‹',
        nextPageItemText: '›',
        firstPageItemText: '«',
        lastPageItemText: '»',
        pageItemText: ({ currentPage, nbPages }) => `${currentPage}/${nbPages}`,
        firstPageItemAriaLabel: `${t("pagination.firstPage")}`,
        previousPageItemAriaLabel: `${t("pagination.previousPage")}`,
        nextPageItemAriaLabel: `${t("pagination.nextPage")}`,
        lastPageItemAriaLabel: `${t("pagination.lastPage")}`,
        pageItemAriaLabel: ({ currentPage, nbPages }) => `${t("pagination.firstPage", { currentPage: currentPage, nbPages: nbPages })}`,
      }}
      classNames={{
        root: 'mb-4',
      }}
    />
  );
};

export default Pagination;
