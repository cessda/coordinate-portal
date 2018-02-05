// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {Layout, LayoutBody, LayoutResults, SearchkitProvider} from 'searchkit';
import Header from '../components/Header';
import Footer from '../components/Footer.jsx';
import searchkit from '../utilities/searchkit';
import {connect} from 'react-redux';

type Props = {};

class TermsPage extends Component<Props> {
  render(): Node {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l">
          <Header/>
          <LayoutBody className="columns">
            <LayoutResults className="column is-12">
              <div className="content has-text-justified mt-15">
                <h4>Terms of use</h4>
                <p>By using this application, you agree to the following terms.</p>
                <p>Fluminaque cetera sive astra recessit ventis spectent. Aequalis campos os
                  scythiam inclusum prima pulsant. Fluminaque sibi pro coercuit dicere secuit
                  habitandae fluminaque cum. Suis homini ventos forma fecit. Iudicis pinus hominum
                  haec quem caelum piscibus di meis. Terrae iuga minantia subsidere rudis. In
                  finxit. Ligavit: militis fluminaque pace lucis. Declivia iners terras utramque
                  lacusque frigida iudicis! Hominum faecis caesa dispositam.</p>
                <p>Aethera fronde diremit declivia imagine montibus quia! Motura cornua qui vindice
                  conversa. Mollia inposuit terram. Aurea deus tenent contraria et lumina? Freta
                  deerat homo cetera illas ut. Usu coegit origine viseret! Unda fontes. Astra
                  animal. Dedit fulgura lege! Fabricator locoque locoque spectent membra animus
                  fluminaque. Praeter zephyro ventis sidera spectent posset: grandia ultima
                  premuntur. Addidit fabricator sorbentur austro titan videre.</p>
                <p>Carentem vultus recessit mundum matutinis ipsa pluviaque locis! Secrevit cepit
                  fuit bracchia frigida tegi circumfuso premuntur. Austro nondum quarum quisquis
                  carmen diverso. Cuncta sui deorum plagae consistere ambitae. Est invasit meis
                  prima contraria inminet feras militis. Mollia habendum natus diversa inmensa tegit
                  lanient nullaque scythiam. Pluviaque iuga. Bene rudis dei carmen. Fuerant aberant
                  fontes flexi illic pondus arce neu tum.</p>
                <p>Agitabilis caligine! Nuper egens cornua dedit pendebat discordia toto
                  nabataeaque. Nullo faecis adspirate dedit calidis faecis bracchia ante. Caelum
                  frigore concordi rudis tumescere. Manebat circumdare pondus meis liquidas quin
                  nova declivia! Ambitae ita. Origo terrenae securae facientes recens aurea. Unus
                  fronde certis concordi secant speciem porrexerat. Pluviaque aeris regio. Duae
                  invasit pronaque naturae. Agitabilis coeptis hanc inmensa aliis inter opifex.</p>
                <p>Tractu pontus? Mixta arce mixta quin litem facientes elementaque adhuc? Nunc neu
                  terras solum orbis. Dispositam levitate coegit finxit fossae silvas auroram.
                  Addidit subsidere persidaque flamina sunt illi locis. Super orbis congeriem deus.
                  Ignea neu aer moderantum lumina summaque. Feras arce chaos: liberioris utramque
                  mundum acervo quam. Pluviaque matutinis locum hunc cum illi aberant. Omnia caeca
                  cum pluviaque alta dissociata?</p>
              </div>
            </LayoutResults>
          </LayoutBody>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default connect(null, null)(TermsPage);
