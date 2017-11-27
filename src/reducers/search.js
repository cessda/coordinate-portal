// @flow

import {getDataInLanguage, getDescription, getLanguages, getSource} from '../utilities/metadata';
import type {Action} from '../actions';
import * as _ from 'lodash';

type State = {
  showSummary: boolean,
  displayed: Object[],
  similars?: {
    id: string,
    title: string
  }[],
  query: any,
  state: any
};

const initialState: State = {
  showSummary: false,
  displayed: [],
  query: Object,
  state: Object
};

const search = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'INIT_SEARCHKIT':
      return state;

    case 'TOGGLE_SUMMARY':
      return Object.assign({}, state, {
        showSummary: !state.showSummary
      });

    case 'TOGGLE_LONG_DESCRIPTION':
      let array: Object[] = _.cloneDeep(state.displayed);

      array[action.index].descriptionExpanded = !array[action.index].descriptionExpanded;

      return Object.assign({}, state, {
        displayed: array
      });

    case 'UPDATE_DISPLAYED':
      let displayed: Object[] = [];

      for (let i: number = 0; i < action.displayed.length; i++) {
        if (action.displayed[i]._source === undefined) {
          break;
        }

        let esUrl: string = (process.env.PASC_ELASTICSEARCH_URL: any),
          item: Object = {
            id: action.displayed[i]._id,
            identifier: action.displayed[i]._source.dc.identifier.nn[0],
            title: getDataInLanguage(action.displayed[i]._source.dc.title, action.language),
            creator: getDataInLanguage(action.displayed[i]._source.dc.creator, action.language, [],
              true),
            coverage: getDataInLanguage(action.displayed[i]._source.dc.coverage, action.language),
            timeDimension: getDataInLanguage(action.displayed[i]._source.dc.timeDimension,
              action.language),
            analysisUnit: getDataInLanguage(action.displayed[i]._source.dc.analysisUnit,
              action.language),
            dataSourceType: getDataInLanguage(action.displayed[i]._source.dc.dataSourceType,
              action.language),
            samplingProcedures: getDataInLanguage(action.displayed[i]._source.dc.samplingProcedures,
              action.language),
            samplingDescription: getDataInLanguage(
              action.displayed[i]._source.dc.samplingDescription,
              action.language),
            dataCollectionMethod: getDataInLanguage(
              action.displayed[i]._source.dc.dataCollectionMethod, action.language),
            languageOfDataFiles: getDataInLanguage(action.displayed[i]._source.dc.language,
              action.language),
            publisher: getDataInLanguage(action.displayed[i]._source.dc.publisher, action.language),
            date: getDataInLanguage(action.displayed[i]._source.dc.date, action.language),
            rights: getDataInLanguage(action.displayed[i]._source.dc.rights, action.language),
            subject: getDataInLanguage(action.displayed[i]._source.dc.subject, action.language, [],
              true),
            jsonUrl: esUrl + '/dc/_all/' + action.displayed[i]._source.esid,
            restricted: false
          };

        getLanguages(item, action.displayed[i]);

        getDescription(item, action.language, action.displayed[i]);

        getSource(item, action.displayed[i]);

        displayed.push(item);
      }

      return Object.assign({}, state, {
        displayed: displayed
      });

    case 'UPDATE_QUERY':
      return Object.assign({}, state, {
        query: action.query
      });

    case 'UPDATE_STATE':
      return Object.assign({}, state, {
        state: action.state
      });

    case 'UPDATE_SIMILARS':
      let similars: {
        id: string,
        title: string
      }[] = [];

      for (let i: number = 0; i < action.similars.length; i++) {
        similars.push({
          id: action.similars[i]._id,
          title: action.similars[i].fields['dc.title.all'][0]
        });
        if (i > 3) {
          break;
        }
      }

      return Object.assign({}, state, {
        similars: similars
      });

    case 'RESET_SEARCH':
      return state;

    default:
      return state;
  }
};

export default search;
