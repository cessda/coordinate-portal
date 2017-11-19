// @flow

import * as globals from '../../config';
import * as counterpart from 'react-translate-component';
import type {Action} from '../actions';

type State = {
  uiCode: string,
  dataCode: string,
  list?: {
    id: string,
    label: string
  }[]
};

const initialState: State = {
  uiCode: globals.initialLanguage,
  dataCode: 'all'
};

const language = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'INIT_TRANSLATIONS':
      return Object.assign({}, state, {
        list: [{
          id: 'en',
          label: counterpart.translate('language.languages.en')
        }, {
          id: 'de',
          label: counterpart.translate('language.languages.de')
        }, {
          id: 'nn',
          label: counterpart.translate('language.languages.nn')
        }]
      });

    case 'CHANGE_UI_LANGUAGE':
      return Object.assign({}, state, {
        uiCode: action.code
      });

    case 'CHANGE_DATA_LANGUAGE':
      return Object.assign({}, state, {
        dataCode: action.code
      });

    default:
      return state;
  }
};

export default language;
