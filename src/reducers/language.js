// @flow

import type {Action} from '../actions';

type State = {
  code: string,
  list?: {
    id: string,
    label: string
  }[],
  missing: boolean
};

const initialState: State = {
  code: 'en',
  missing: false
};

const language = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'INIT_TRANSLATIONS':
      return Object.assign({}, state, {
        list: action.list
      });

    case 'CHANGE_LANGUAGE':
      return Object.assign({}, state, {
        code: action.code,
        missing: action.missing
      });

    default:
      return state;
  }
};

export default language;
