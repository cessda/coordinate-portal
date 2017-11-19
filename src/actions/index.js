// @flow

import type {LanguageAction} from './language';
import type {SearchAction} from './search';

export type Action =
  | LanguageAction
  | SearchAction;
