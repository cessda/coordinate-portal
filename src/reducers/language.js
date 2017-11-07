import * as globals from '../../config';
import * as counterpart from 'react-translate-component';
import {CHANGE_LANGUAGE, INIT_TRANSLATIONS} from '../actions/language';

const initialState = {
  code: globals.initialLanguage
};

const language = (state = initialState, action) => {
  switch (action.type) {
    case INIT_TRANSLATIONS:
      return Object.assign({}, state, {
        code: action.code,
        label: counterpart.translate('languagePicker.label'),
        list: [{
          id: 'en',
          label: counterpart.translate('languagePicker.languages.en')
        }, {
          id: 'de',
          label: counterpart.translate('languagePicker.languages.de')
        }]
      });

    case CHANGE_LANGUAGE:
      return Object.assign({}, state, {
        code: action.code
      });

    default:
      return state;
  }
};

export default language;
