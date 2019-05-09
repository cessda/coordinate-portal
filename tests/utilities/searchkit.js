import searchkit, { detailQuery, queryBuilder, similarQuery } from '../../src/utilities/searchkit';

describe('Searchkit utilities', () => {
  describe('queryBuilder()', () => {
    it('should return a Searchkit query object', () => {
      expect(queryBuilder('search text', {})).toEqual({
        simple_query_string: {
          query: 'search text'
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

  describe('Default Query', () => {
    it('should filter results to only return active studies', () => {
      expect(searchkit.buildQuery().query.query).toEqual({
        filtered: {
          filter: {
            term: {
              isActive: true
            }
          }
        }
      });
    });
  });
});
