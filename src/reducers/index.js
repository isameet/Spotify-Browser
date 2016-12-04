import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {searchReducer as search, filterReducer as allFilters} from './searchReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  search,
  allFilters
});

export default rootReducer;
