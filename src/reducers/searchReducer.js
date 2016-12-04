import * as types from '../actions/actionTypes';
import initialState from './initialState';

function getSearchResultsCount(results) {
  return (
    (results.albums && results.albums.total || 0) + (results.artists && results.artists.total || 0) +
    (results.playlists && results.playlists.total || 0) + (results.tracks && results.tracks.total || 0)
  );
}

export function searchReducer(state = initialState.search, action) {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      return {
        results: action.results,
        count: getSearchResultsCount(action.results)
      };
    case types.SEARCH_CLEAR:
      return {
        results: {},
        count: 0
      };
    default:
      return state;
  }
}

export function filterReducer(state = initialState.allFilters, action) {
  return state;
}
