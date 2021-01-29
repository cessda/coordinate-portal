// @flow
// Copyright CESSDA ERIC 2017-2021
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



import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  FaLinkedinSquare,
  FaTwitterSquare,
  FaYoutubeSquare
} from 'react-icons/lib/fa/index';
import Translate from 'react-translate-component';

type Props = {};

export class Footer extends Component<Props> {
  render(): Node {
    return (
      <footer>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-4">
                  <div className="logo-footer"/>
                </div>
                <div className="column is-4 has-text-centered">
                  <ul>
                    <li><strong>CESSDA ERIC</strong></li>
                    <li>Parkveien 20</li>
                    <li>5007 Bergen, Norway</li>
                    <li>+47 401 00 964</li>
                    <li>cessda@cessda.eu</li>
                  </ul>
                </div>
                <div className="column is-4 has-text-right">
                  <ul className="footer-social">
                    <li><Translate content="footer.followUsOn"/>:</li>
                    <li><a href="https://twitter.com/CESSDA_Data" target="_blank"><FaTwitterSquare/></a></li>
                    <li><a href="https://www.linkedin.com/company/9392869" target="_blank"><FaLinkedinSquare/></a></li>
                    <li><a href="https://www.youtube.com/channel/UCqbZKb1Enh-WcFpg6t86wsA" target="_blank"><FaYoutubeSquare/></a></li>
                  </ul>
                  <ul>
                    <li className="is-hidden-mobile">&nbsp;</li>
                    <li><a href="./documentation/" target="_blank"><Translate content="footer.documentation"/></a></li>
                    <li><a href="https://www.cessda.eu/Privacy-policy" target="_blank"><Translate content="footer.privacy"/></a></li>
                    <li><a href="https://www.cessda.eu/Acceptable-Use-Policy" target="_blank"><Translate content="footer.aup"/></a></li>
                    <li><a href="https://www.cessda.eu/Tools-Services" target="_blank"><Translate content="footer.tools"/></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "CESSDA ERIC",
            "url": "https://www.cessda.eu",
            "sameAs": [
              "https://twitter.com/CESSDA_Data",
              "https://www.linkedin.com/company/9392869",
              "https://www.youtube.com/channel/UCqbZKb1Enh-WcFpg6t86wsA"
            ]
          })}
        </script>
      </footer>
    );
  }
}

export default connect()(Footer);
