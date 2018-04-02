// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  FaEnvelope,
  FaFacebookSquare, FaGooglePlusSquare, FaInstagram, FaLinkedinSquare, FaMapMarker, FaPhoneSquare,
  FaTwitter,
  FaTwitterSquare, FaYoutubeSquare
} from 'react-icons/lib/fa/index';
import Translate from 'react-translate-component';

type Props = {};

class Footer extends Component<Props> {
  render(): Node {
    return (
      <footer>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="footer-line"/>
                  <div className="logo-footer"/>
                  <ul className="footer-social">
                    <li><Translate content="footer.followUsOn"/>:</li>
                    <li><a href="https://twitter.com/CESSDA_Data" target="_blank"><FaTwitterSquare/></a></li>
                    <li><a href="https://www.facebook.com/Cessda-463858013634628" target="_blank"><FaFacebookSquare/></a></li>
                    <li><a href="https://www.instagram.com/cessda_data" target="_blank"><FaInstagram/></a></li>
                    <li><a href="https://www.linkedin.com/company/9392869" target="_blank"><FaLinkedinSquare/></a></li>
                    <li><a href="https://plus.google.com/112779581489694492154" target="_blank"><FaGooglePlusSquare/></a></li>
                    <li><a href="https://www.youtube.com/channel/UCqbZKb1Enh-WcFpg6t86wsA" target="_blank"><FaYoutubeSquare/></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="columns">
                <div className="column is-4">
                  <ul>
                    <li><strong><Translate content="footer.contactUs"/></strong></li>
                    <li><FaMapMarker/><span className="ml-10">Parkveien 20, Bergen, Norway</span></li>
                    <li><FaPhoneSquare/><span className="ml-10">(+47) 55 58 36 48</span></li>
                    <li><FaEnvelope/><a href="mailto:cessda@cessda.eu" className="ml-10">cessda@cessda.eu</a></li>
                  </ul>
                </div>
                <div className="column is-3 is-offset-1">
                  <ul>
                    <li><strong><Translate content="footer.menu"/></strong></li>
                    <li><a href="https://www.cessda.eu/About" target="_blank"><Translate content="footer.about"/></a></li>
                    <li><a href="https://www.cessda.eu/Consortium" target="_blank"><Translate content="footer.consortium"/></a></li>
                    <li><a href="https://www.cessda.eu/Projects" target="_blank"><Translate content="footer.projects"/></a></li>
                  </ul>
                </div>
                <div className="column is-3">
                  <ul>
                    <li className="is-hidden-mobile">&nbsp;</li>
                    <li><a href="https://www.cessda.eu/Research-Infrastructure" target="_blank"><Translate content="footer.researchInfrastructure"/></a></li>
                    <li><a href="https://www.cessda.eu/Contact" target="_blank"><Translate content="footer.contact"/></a></li>
                    <li><a href="https://www.cessda.eu/Privacy-policy" target="_blank"><Translate content="footer.privacy"/></a></li>
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
              "https://www.facebook.com/Cessda-463858013634628",
              "https://www.instagram.com/cessda_data",
              "https://www.linkedin.com/company/9392869",
              "https://plus.google.com/112779581489694492154",
              "https://www.youtube.com/channel/UCqbZKb1Enh-WcFpg6t86wsA"
            ]
          })}
        </script>
      </footer>
    );
  }
}

export default connect()(Footer);
