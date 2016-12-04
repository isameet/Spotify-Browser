import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, allFilters, filter = '', searchQuery = '', searchResultsCount = 0}) => {

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        {/* Brand and toggle get grouped for better mobile display */}
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand" href="#"><i className="fa fa-rebel" aria-hidden="true"></i></div>
          </div>
          { /* Collect the nav links, forms, and other content for toggling */ }
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={`dropdown active ${loading ? 'loading' : ''}`}>

                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Filter {filter && filter != 'all' && <span style={{textTransform: 'capitalize'}}>: {filter} </span>}
                  <span className="caret"></span>
                </a>

                <ul className="dropdown-menu">
                  {!searchQuery && <li><IndexLink to="/">All</IndexLink></li>}
                  {searchQuery && <li><Link to={`/all/${searchQuery}`}>All</Link></li>}
                  {
                    allFilters.map(option =>
                      <li key={option.value}>
                        <Link to={`/${option.value}/${searchQuery}`}>{option.text}</Link>
                      </li>
                    )
                  }
                </ul>

              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {
                <li className={`counter ${loading ? 'loading' : ''}`}>
                  {loading && <LoadingDots dots={5}/>}
                  {!loading && searchResultsCount == 0 && <span>No results</span>}
                  {!loading && searchResultsCount > 0 && <span>{`${searchResultsCount} result${searchResultsCount == 1 ? '' : 's'}`}</span>}
                </li>
              }
            </ul>
          </div> {/* /.navbar-collapse */}
        </div> {/* /.container */}
      </div> {/* /.container-fluid */}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  allFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string,
  searchQuery: PropTypes.string,
  searchResultsCount: PropTypes.number
};

export default Header;
