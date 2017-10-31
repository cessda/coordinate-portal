import {CHANGE_LANGUAGE} from '../actions/language';
import * as globals from '../../config';
import * as counterpart from 'react-translate-component';
import counterpartDe from 'counterpart/locales/de';
import en from '../locales/en';
import de from '../locales/de';

const initialState = {
  code: globals.initialLanguage,
  label: counterpart.translate('languagePicker.label'),
  list: [{
    id: 'en',
    label: counterpart.translate('languagePicker.languages.en')
  }, {
    id: 'de',
    label: counterpart.translate('languagePicker.languages.de')
  }]
};

const language = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      let code = (action.code === 'GB' ? 'EN' : action.code).toLowerCase();
      counterpart.setLocale(code);
      return Object.assign({}, state, {
        code: code
      });
    default:
      counterpart.registerTranslations('de', counterpartDe);
      counterpart.registerTranslations('en', en);
      counterpart.registerTranslations('de', de);
      counterpart.setLocale(state.code);
      return state;
  }
};

export default language;
