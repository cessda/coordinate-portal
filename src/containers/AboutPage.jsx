// @flow
// Copyright CESSDA ERIC 2017-2019
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

import type { Node } from 'react';
import React, { Component } from 'react';
import { Layout, LayoutBody, LayoutResults, SearchkitProvider } from 'searchkit';
import Header from '../components/Header';
import Footer from '../components/Footer';
import searchkit from '../utilities/searchkit';
import { connect } from 'react-redux';
import _ from 'lodash';

export class AboutPage extends Component<Props> {
  render(): Node {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l">
          <Header/>
          <LayoutBody className="columns">
            <LayoutResults>
              <article className="about-container">
                <h1 className="about-title">About</h1>

                <p>
                  The CESSDA Data Catalogue (CDC) contains descriptions (metadata) of the more than 30,000 data collections held by CESSDA’s Service Providers (SP),
                  representing 20 European countries. It is a one-stop shop for searching and finding data, enabling effective access to European social science data.
                  The data described are varied. They may be quantitative, qualitative or mixed-modes data, cross-sectional or longitudinal, recently collected or historical data.
                </p>
                
                <p>
                  {/* An a element is used here because the documentation is not part of the React application */}
                  The <a href="/documentation/">User Guide</a> presents an overview of how to use the CDC for searching,
                  including basic search and applying filters as well as advanced search. The CDC is a portal for discovering data.
                  Detailed descriptions of data collections are provided. For information and procedures to access data,
                  there is a link in the lower right of each entry to the website of the data provider [“Access data”].
                </p>

              </article>
            </LayoutResults>
          </LayoutBody>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default connect()(AboutPage);
