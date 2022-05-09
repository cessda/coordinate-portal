// Copyright CESSDA ERIC 2017-2021
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import configureMockStore from 'redux-mock-store';
import { AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { updateSimilars, updateStudy, UPDATE_SIMILARS, UPDATE_STUDY } from "../../src/actions/detail";
import { languages } from "../../src/utilities/language";
import { State } from '../../src/types';
import { enLanguage, mockStudy } from '../mockdata';

const mockStore = configureMockStore<Partial<State>, ThunkDispatch<State, any, AnyAction>>([thunk]);

// Mock Client() in elasticsearch module.
jest.mock('elasticsearch', () => ({
  Client: jest.fn(() => ({
    search: () => Promise.resolve({
      aggregations: {
        unique_id: {
          value: 1
        }
      },
      hits: {
        hits: [
          {
            _source: {
              id: 2,
              titleStudy: 'Similar Study Title'
            }
          }
        ],
        total: 1
      },
      timed_out: false,
      took: 1
    })
  }))
}));

describe('Detail actions', () => {
  describe('UPDATE_SIMILARS action', () => {
    it('is created when the list of similar studies is updated', async () => {
      // Mock Redux store.
      const store = mockStore({
        language: {
          currentLanguage: enLanguage,
          list: languages
        }
      });

      // Dispatch action and wait for promise.
      const similars = updateSimilars(mockStudy);

      await store.dispatch(similars);
      
      // State should contain similar studies.
      expect(store.getActions()).toEqual([
        {
          type: UPDATE_SIMILARS,
          similars: [
            {
              id: 2,
              titleStudy: 'Similar Study Title'
            }
          ]
        }
      ]);
    });
  });

  describe('UPDATE_STUDY action', () => {
    it('is created when the displayed study is requested', async () => {
      // Mock Redux store.
      const store = mockStore({
        language: {
          currentLanguage: enLanguage,
          list: languages
        }
      });

      const action = updateStudy("1");

      await store.dispatch(action);

      expect(store.getActions()).toEqual([
        {
          type: UPDATE_STUDY,
          displayed: {
            aggregations: {
              unique_id: {
                value: 1
              }
            },
            hits: {
              hits: [
                {
                  _source: {
                    id: 2,
                    titleStudy: 'Similar Study Title'
                  }
                }
              ],
              total: 1
            },
            timed_out: false,
            took: 1
          }
        },
        // The action should also update similars as well
        {
          type: UPDATE_SIMILARS,
          similars: [
            {
              id: 2,
              titleStudy: 'Similar Study Title'
            }
          ]
        }
      ]);
    });
  });
});
