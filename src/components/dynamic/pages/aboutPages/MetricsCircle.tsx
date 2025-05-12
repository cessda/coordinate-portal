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

export interface MetricsCircleProps {
  amount: number;
  description: string;
}

export const MetricsCircle: React.FC<MetricsCircleProps> = ({ amount, description }) => {
  return (
    <div className="columns is-flex is-flex-direction-column is-vcentered mb-0">
      <div className="metrics-circle m-2">
        <span className="metrics-circle-text">{amount}</span>
      </div>
      <div className="metrics-description">{description}</div>
    </div>
  );
};
