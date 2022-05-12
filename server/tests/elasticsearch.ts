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

/** @jest-environment node */

import { getSimilars, getStudy, similarQuery } from "../elasticsearch";
import { mockStudy } from "../../common/tests/mockdata"

// Mock Client() in elasticsearch module.
jest.mock('@elastic/elasticsearch', () => ({
  Client: jest.fn(() => ({
    get: () => Promise.resolve({
      body: {
        _source: mockStudy
      }
    }),
    search: () => Promise.resolve({
      body: {
        aggregations: {
          unique_id: {
            value: 1
          }
        },
        hits: {
          hits: [
            {
              _source: mockStudy
            },
            {
              _source: undefined
            }
          ]
        }
      }
    })
  }))
}));

describe('elasticsearch utilities', () => {
  describe('similarQuery()', () => {
    it('should return a Searchkit query used to retrieve similar studies', () => {
      expect(similarQuery('id', 'Study Title')).toEqual({
        bool: {
          must: {
            match: {
              titleStudy: 'Study Title'
            }
          },
          must_not: {
            ids: {
              values: ['id']
            }
          }
        }
      });
    });
  });

  describe('getStudy()', () => {
    it('should get a study', async () => {
      await expect(getStudy(mockStudy.id, "cmmstudy_en")).resolves.toBe(mockStudy);
    });
  });

  describe('getSimilars()', () => {
    it('should return an array of similars', async () => {
      await expect(getSimilars(mockStudy.titleStudy, mockStudy.id, "cmmstudy_en"))
        .resolves.toStrictEqual([{ 
          id: mockStudy.id, 
          title: mockStudy.titleStudy
        }]);
    });
  });
});
