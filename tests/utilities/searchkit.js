// Copyright CESSDA ERIC 2017-2019
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

import { detailQuery, pidQuery, queryBuilder, similarQuery } from '../../src/utilities/searchkit';

describe('Searchkit utilities', () => {
  describe('queryBuilder()', () => {
    it('should return a Searchkit query object', () => {
      expect(queryBuilder('search text', {})).toEqual({
        simple_query_string: {
          query: 'search text',
          fields: [
            "titleStudy^3",
            "abstract^1.5",
            "creators^1.5",
            "keywords.properties",
          ],
        }
      });
    });
  });

  describe('detailQuery()', () => {
    it('should return a Searchkit query used to retrieve a single study', () => {
      expect(detailQuery(1)).toEqual({
        bool: {
          must: {
            match: {
              id: 1
            }
          }
        }
      });
    });
  });

  describe('pidQuery()', () => {
    it('should return a Searchkit query used to retrieve a single study based on PID', () => {
      expect(pidQuery('UKDS__6358')).toEqual({
        bool: {
          must: {
            match: {
              pidStudies: 'UKDS__6358'
            }
          }
        }
      });
    });
  });

  describe('similarQuery()', () => {
    it('should return a Searchkit query used to retrieve similar studies', () => {
      expect(similarQuery('Study Title')).toEqual({
        bool: {
          must: {
            match: {
              titleStudy: 'Study Title'
            }
          }
        }
      });
    });
  });
});
