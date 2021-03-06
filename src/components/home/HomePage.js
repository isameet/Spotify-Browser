import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

import SearchQuery from '../search/SearchQuery';
import SearchResults from '../search/SearchResults';
import * as actions from '../../actions/searchActions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.onSearch();
  }

  componentWillReceiveProps(nextProps) {
    if (this.hasFilterChanged(nextProps.filter, this.props.filter) || nextProps.searchQuery != this.props.searchQuery) {
      this.onSearch(nextProps.searchQuery, nextProps.filter);
    }
  }

  hasFilterChanged(nextFilter, currentFilter) {

    // we treat "all", emtpy or null filter as the same - i.e. no filter
    // hence this check while figuring out if the props have really changed

    const equivalent = ['all', '', null];
    if (typeof  nextFilter == 'undefined' || equivalent.indexOf(nextFilter) > -1) {
      nextFilter = '';
    }

    if (typeof  currentFilter == 'undefined' || equivalent.indexOf(currentFilter) > -1) {
      currentFilter = '';
    }

    return nextFilter != currentFilter;
  }

  onSearch(searchQuery = this.props.searchQuery, filter = this.props.filter) {

    // if filter is "all", search-query is empty, url can be made cleaner by omitting "all"
    filter = (filter == 'all' && !searchQuery) ? '' : filter;

    // if filter is empty, but search-query is not, filter needs to be set to "all"
    // because we went for filter/search-term pattern of URLs instead of query-string
    filter = (filter == '' && searchQuery) ? 'all' : filter;

    // keep adding to browser history for navigation support
    browserHistory.push(`/${filter}/${searchQuery }`.replace('//', '/'));

    if (typeof searchQuery === 'undefined' || !searchQuery) {
      this.props.actions.clearSearch();
      return;
    }

    this.props.actions.search({filter, searchQuery, allFilters: this.props.allFilters})
      .catch(error => {
        toastr.error(error.message);
      });
  }

  render() {
    const {searchQuery, searchResults, loading} = this.props;

    return (
      <div>
        <SearchQuery value={searchQuery} onSearch={this.onSearch} loading={loading} />
        <SearchResults results={searchResults} />
      </div>
    );
  }
}

HomePage.defaultProps = {
  filter: '',
  searchQuery: ''
};

HomePage.propTypes = {
  filter: PropTypes.string,
  searchQuery: PropTypes.string,
  allFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchResults: PropTypes.object,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    filter: ownProps.params.filter,
    searchQuery: ownProps.params.searchQuery,
    allFilters: state.allFilters,
    searchResults: state.search.results,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
