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
import { Hits, Layout, LayoutBody, LayoutResults, SearchkitProvider, SideBar } from 'searchkit';
import Header from '../components/Header';
import Language from '../components/Language';
import Detail from '../components/Detail';
import Footer from '../components/Footer.jsx';
import searchkit from '../utilities/searchkit';
import Panel from '../components/Panel';
import { connect } from 'react-redux';
import { FaAngleLeft, FaCode, FaExternalLink } from 'react-icons/lib/fa/index';
import { bindActionCreators } from 'redux';
import Translate from 'react-translate-component';
import Similars from '../components/Similars';
import { goBack } from 'react-router-redux';
import type { Dispatch, State } from '../types';
import _ from 'lodash';

export class AboutPage extends Component<Props> {
  render(): Node {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l">
          <Header/>
          <LayoutBody className="columns">
            <LayoutResults className="column is-8">
              <article>
                <h1>About</h1>

                <p>
                  The CESSDA Data Catalogue (CDC) harvests metadata from various endpoints. 
                  It uses different repository handlers to adapt the payload for each type 
                  of endpoint to a standard format (the CESSDA Metadata Model, CMM).
                </p>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.
                  Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, 
                  sit amet commodo magna eros quis urna.
                </p>

                <p>
                  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
                </p>

              </article>
            </LayoutResults>
          </LayoutBody>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    )
  }
}

export const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    goBack: bindActionCreators(goBack, dispatch)
  };
};

export default connect(mapDispatchToProps)(AboutPage);
