import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    const {loading, filter, allFilters, searchQuery, searchResultsCount} = this.props;

    return (
      <div>
        <Header loading={loading} filter={filter} allFilters={allFilters} searchQuery={searchQuery}
                searchResultsCount={searchResultsCount}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  allFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string,
  searchQuery: PropTypes.string,
  searchResultsCount: PropTypes.number
};

function mapStateToProps(state, ownProps) {

  return {
    allFilters: state.allFilters,
    filter: ownProps.params.filter,
    searchQuery: ownProps.params.searchQuery,
    searchResultsCount: state.search.count,
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);

