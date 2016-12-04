import React, {PropTypes} from 'react';
import toastr from 'toastr';

class SearchQuery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      error: false,
      errorMessage: 'Please fill out the form.'
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.setState({ value: nextProps.value, error: !nextProps.value })
    }
  }

  onChange(event) {
    const newValue = event.target.value;
    this.setState({ value: newValue, error: !newValue });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.loading) {
      return;
    }

    const error = !this.state.value;
    if (error) {
      toastr.error('Search query required.');
    }

    this.setState({ error: error });
    this.props.onSearch(this.state.value);
  }

  render() {
    const {loading} = this.props;

    return (
      <div className="container">
        <form className="form-horizontal" onSubmit={this.onSubmit}>
          <div className="form-group form-group-lg">
            <div className="col-xs-12 col-sm-8 col-sm-offset-2">
              <input
                className="form-control"
                type="text"
                id="formGroupInputLarge"
                placeholder="Search..."
                value={this.state.value}
                onChange={this.onChange}
                disabled={loading}
              />
              <a className={`search-icon ${loading ? 'disabled' : ''}`} onClick={this.onSubmit}><i className="fa fa-search" aria-hidden="true"/></a>
              {this.state.error && <p className="error">{this.state.errorMessage}</p>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SearchQuery.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default SearchQuery;
