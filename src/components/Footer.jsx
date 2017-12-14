// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FaTwitter} from 'react-icons/lib/fa/index';

type Props = {};

class Footer extends Component<Props> {
  render(): Node {
    return (
      <footer>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-2 is-offset-1">
                  <ul>
                    <li><strong>CESSDA ERIC</strong></li>
                    <li>Parkveien 20</li>
                    <li>5007 Bergen</li>
                    <li>Norway</li>
                  </ul>
                </div>
                <div className="column is-3 is-offset-1">
                  <ul>
                    <li>(+47) 55 58 36 48</li>
                    <li><a href="mailto:cessda@cessda.eu">cessda@cessda.eu</a></li>
                    <li><a href="https://twitter.com/CESSDA_Data/"><FaTwitter/> CESSDA ERIC</a></li>
                    <li><a href="https://twitter.com/Eleanor_RES/lists/cessda"><FaTwitter/> Organisations Feed</a></li>
                  </ul>
                </div>
                <div className="column is-3 is-offset-1">
                  <ul>
                    <li><a href="https://www.cessda.eu/About">About</a></li>
                    <li><a href="https://www.cessda.eu/Consortium">Consortium</a></li>
                    <li><a href="https://www.cessda.eu/Research-Infrastructure/Training">Training</a></li>
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
