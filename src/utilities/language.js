// @flow

// translations not available for all languages
import de from '../locales/de';
import el from '../locales/el';
import en from '../locales/en';
import fi from '../locales/fi';
import fr from '../locales/fr';
import nl from '../locales/nl';
import no from '../locales/no';
import sv from '../locales/sv';
import sk from '../locales/sk';
import sl from '../locales/sl';

export function getLanguages(): Object[] {
  // Register translations stored in the "/locales" directory by adding them to the array below.
  // To add a new language with an associated Elasticsearch index, use the following format:
  // {
  //   code   : The 2 letter ISO code for this language.
  //   label  : The native label for this language.
  //   index  : The Elasticsearch index containing data for this language.
  //   locale : The imported locale for this language.
  // }
  return [{
    code: 'de',
    label: 'Deutsch',
    index: 'cmmstudy_de',
    locale: de
  }, {
    code: 'el',
    label: 'Νέα Ελληνικά',
    index: 'cmmstudy_el',
    locale: el
  }, {
    code: 'en',
    label: 'English',
    index: 'cmmstudy_en',
    locale: en
  }, {
    code: 'fi',
    label: 'Suomi',
    index: 'cmmstudy_fi',
    locale: fi
  }, {
    code: 'fr',
    label: 'Francais',
    index: 'cmmstudy_fr',
    locale: fr
  }, {
    code: 'nl',
    label: 'Nederlands',
    index: 'cmmstudy_nl',
    locale: nl
  }, {
    code: 'no',
    label: 'Nynorsk',
    index: 'cmmstudy_no',
    locale: no
  }, {
    code: 'sv',
    label: 'Svenska',
    index: 'cmmstudy_sv',
    locale: sv
  }, {
    code: 'sk',
    label: 'Slovencina',
    index: 'cmmstudy_sk',
    locale: sk
  }, {
    code: 'sl',
    label: 'Slovenski',
    index: 'cmmstudy_sl',
    locale: sl
  }];
}
