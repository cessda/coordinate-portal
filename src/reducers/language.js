// @flow

import type {Action} from '../actions';

type State = {
  code: string,
  list?: {
    code: string,
    label: string,
    index: string
  }[]
};

const initialState: State = {
  code: 'en'
};

const language = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'INIT_TRANSLATIONS':
      return Object.assign({}, state, {
        list: action.list
      });

    case 'CHANGE_LANGUAGE':
      return Object.assign({}, state, {
        code: action.code
      });

    default:
      return state;
  }
};

export default language;
