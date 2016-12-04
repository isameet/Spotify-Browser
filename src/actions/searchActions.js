import * as types from './actionTypes';
import * as spotifyApi from '../api/spotifyApi';
import {beginAjaxCall, errorAjaxCall} from './ajaxStatusActions';

function getDefaultFilter(allFilters) {
  return allFilters.map(filter => filter.value).join(',');
}

function searchSuccess(results) {
  return {type: types.SEARCH_SUCCESS, results};
}

export function search({filter, searchQuery, allFilters}) {

  filter = !filter || filter == 'all' ? getDefaultFilter(allFilters) : filter;

  return dispatch => {
    dispatch(beginAjaxCall());

    return spotifyApi.search({filter, searchQuery}).then(results => {
      dispatch(searchSuccess(results));
    }).catch(error => {
      dispatch(errorAjaxCall());
      throw(error);
    });
  };
}

export function clearSearch() {
  return { type: types.SEARCH_CLEAR };
}

