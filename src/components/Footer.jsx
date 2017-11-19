// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

type Props = {};

class Footer extends Component<Props> {
  render(): Node {
    return (
      <footer className="dsn-list-footerWHOLE">
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-2 is-offset-1">
                  <ul>
                    <li><strong>CESSDA AS</strong></li>
                    <li>Parkveien 20</li>
                    <li>5007 Bergen</li>
                    <li>Norway</li>
                  </ul>
                </div>
                <div className="column is-3 is-offset-1">
                  <ul>
                    <li>(+47) 55 58 36 48</li>
                    <li><a href="mailto:cessda@cessda.net">cessda@cessda.net</a></li>
                    <li><a href="https://twitter.com/CESSDA_Data/">Twitter - CESSDA</a></li>
                    <li><a href="https://twitter.com/Eleanor_RES/lists/cessda">Twitter - Relevantorganisations feed</a></li>
                  </ul>
                </div>
                <div className="column is-3 is-offset-1">
                  <ul>
                    <li><a href="https://cessda.net/eng/CESSDA-Services/Resources/Data-Catalogue">DataCatalogue</a></li>
                    <li><a href="https://cessda.net/eng/National-Data-Services">NationalDataServices</a></li>
                    <li><a href="https://cessda.net/eng/CESSDA-Training">CESSDA Training</a></li>
                    <li><a href="https://cessda.net/eng/CESSDA-Services">CESSDA Services</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default connect()(Footer);
