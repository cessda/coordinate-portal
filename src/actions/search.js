// @flow

import searchkit, {detailQuery, similarQuery} from '../utilities/searchkit';
import * as elasticsearch from 'elasticsearch';
import * as _ from 'lodash';
import type {Dispatch, GetState, State, Thunk} from '../types';
import * as ReactGA from 'react-ga';
import {push} from 'react-router-redux';

//////////// Redux Action Creator : INIT_SEARCHKIT

export type InitSearchkitAction = {
  type: 'INIT_SEARCHKIT'
}

export const initSearchkit = (): Thunk => {
  return (dispatch: Dispatch, getState: GetState): void => {
    let timer: number;

    searchkit.setQueryProcessor((query: Object): Object => {
      let state: State = getState(),
          init: boolean = timer === undefined;

      clearTimeout(timer);

      timer = setTimeout((): void => {
        if (!init) {
          ReactGA.pageview('/' + searchkit.history.location.search);
        }
      }, 3000);

      // If viewing detail page, override query to retrieve single record using its ID.
      if (_.trim(state.routing.locationBeforeTransitions.pathname, '/') === 'detail' &&
          state.routing.locationBeforeTransitions.query.q !== undefined) {
        delete query.highlight;
        query.query = detailQuery(_.trim(state.routing.locationBeforeTransitions.query.q, '"'));
      }

      // Redirect from 'detail' page to 'search results' page if users change search query text.
      if (state.routing.locationBeforeTransitions.pathname !== '/' &&
          state.search.query.size === 1) {
        dispatch(push('/'));
      }

      dispatch(updateQuery(query));
      dispatch(updateState(searchkit.state));

      return query;
    });

    searchkit.addResultsListener((results: Object): void => {
      let state: State = getState();

      // Redirect from 'detail' page to 'search results' page if item does not exist or the
      // item ID does not match the requested ID in the URL.
      if (_.trim(state.routing.locationBeforeTransitions.pathname, '/') === 'detail' &&
          (results.hits.hits.length === 0 ||
           _.trim(state.routing.locationBeforeTransitions.query.q, '"') !==
           results.hits.hits[0]._id)) {
        dispatch(push('/'));
      }

      dispatch(updateDisplayed(results.hits.hits));
    });

    dispatch({
      type: 'INIT_SEARCHKIT'
    });
  };
};

//////////// Redux Action Creator : TOGGLE_MOBILE_FILTERS

export type ToggleMobileFiltersAction = {
  type: 'TOGGLE_MOBILE_FILTERS'
}

export const toggleMobileFilters = (): ToggleMobileFiltersAction => {
  return {
    type: 'TOGGLE_MOBILE_FILTERS'
  };
};

//////////// Redux Action Creator : TOGGLE_ADVANCED_SEARCH

export type ToggleAdvancedSearchAction = {
  type: 'TOGGLE_ADVANCED_SEARCH'
}

export const toggleAdvancedSearch = (): ToggleAdvancedSearchAction => {
  return {
    type: 'TOGGLE_ADVANCED_SEARCH'
  };
};

//////////// Redux Action Creator : TOGGLE_SUMMARY

export type ToggleSummaryAction = {
  type: 'TOGGLE_SUMMARY'
}

export const toggleSummary = (): ToggleSummaryAction => {
  return {
    type: 'TOGGLE_SUMMARY'
  };
};

//////////// Redux Action Creator : TOGGLE_LONG_DESCRIPTION

export type ToggleLongDescriptionAction = {
  type: 'TOGGLE_LONG_DESCRIPTION',
  index: number
}

export const toggleLongDescription = (title: string, index: number): Thunk => {
  return (dispatch: Dispatch): void => {
    ReactGA.event({
      category: 'Search',
      action: 'Read more',
      label: title
    });

    dispatch({
      type: 'TOGGLE_LONG_DESCRIPTION',
      index
    });
  };
};

//////////// Redux Action Creator : UPDATE_DISPLAYED

export type UpdateDisplayedAction = {
  type: 'UPDATE_DISPLAYED',
  displayed: any,
  language: string
}

export const updateDisplayed = (displayed: Object[]): Thunk => {
  return (dispatch: Dispatch, getState: GetState): void => {
    dispatch({
      type: 'UPDATE_DISPLAYED',
      displayed,
      language: getState().language.code
    });
  };
};

//////////// Redux Action Creator : UPDATE_QUERY

export type UpdateQueryAction = {
  type: 'UPDATE_QUERY',
  query: Object
}

export const updateQuery = (query: Object): UpdateQueryAction => {
  return {
    type: 'UPDATE_QUERY',
    query
  };
};

//////////// Redux Action Creator : UPDATE_STATE

export type UpdateStateAction = {
  type: 'UPDATE_STATE',
  state: Object
}

export const updateState = (state: Object): UpdateStateAction => {
  return {
    type: 'UPDATE_STATE',
    state
  };
};

//////////// Redux Action Creator : UPDATE_SIMILARS

export type UpdateSimilarsAction = {
  type: 'UPDATE_SIMILARS',
  similars: any
}

export const updateSimilars = (item: Object): Thunk => {
  return (dispatch: Dispatch): void => {
    let client: Object = new elasticsearch.Client({
      host: {
        protocol: _.trim(window.location.protocol, ':'),
        host: window.location.hostname,
        port: window.location.port ||
              (_.endsWith(_.trim(window.location.protocol, ':'), 's') ? 443 : 80),
        path: '/api/es'
      }
    });

    client.search(similarQuery(item.title)).then((response: Object): void => {
      dispatch({
        type: 'UPDATE_SIMILARS',
        similars: _.uniqBy(_.filter(response.hits.hits, (hit: Object): boolean => {
          return hit._id !== item.id && hit.fields['dc.title.all'][0] !== item.title;
        }), (hit: Object): string => {
          return hit.fields['dc.title.all'][0];
        })
      });
    });
  };
};

//////////// Redux Action Creator : RESET_SEARCH

export type ResetSearchAction = {
  type: 'RESET_SEARCH';
}

export const resetSearch = (): Thunk => {
  return (dispatch: Dispatch): void => {
    searchkit.resetState();
    searchkit.reloadSearch();

    dispatch({
      type: 'RESET_SEARCH'
    });
  };
};

////////////

export type SearchAction =
  | InitSearchkitAction
  | ToggleMobileFiltersAction
  | ToggleAdvancedSearchAction
  | ToggleSummaryAction
  | ToggleLongDescriptionAction
  | UpdateDisplayedAction
  | UpdateQueryAction
  | UpdateStateAction
  | UpdateSimilarsAction
  | ResetSearchAction;
