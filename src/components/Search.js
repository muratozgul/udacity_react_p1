import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import qs from 'qs';
import { Link, withRouter } from 'react-router-dom';
import api from '../api/WrappedBookAPI';
import Book from './Book';

class Search extends Component {
  /*
    NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
  */
  constructor(props) {
    super(props);
    this.handleChange = _.debounce(this._handleChange, 800);
    this.state = {
      waiting: false,
      query: null,
      results: [],
      error: null
    };
  }

  componentDidMount() {
    const search = this.props.location.search;
    if (search) {
      const query = qs.parse(search, { ignoreQueryPrefix: true }).query;
      this.search(query);
    }
  }

  _handleChange = (value) => {
    this.props.history.push(`/search?query=${value}`);
    this.search(value);
  }

  search(query) {
    this.setState({ waiting: true, error: null });
    api.search(query, 20)
      .then(results => {
        this.setState({ waiting: false, results });
      })
      .catch(error => {
        this.setState({ waiting: false, results: [], error });
      });
  }

  renderResults() {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {
            this.state.results.map(book => {
              return (
                <li key={book.id}>
                  <Book refreshData={this.props.refreshData} {...book} />
                </li>
              );
            })
          }
        </ol>
      </div>
    );
  }

  renderError() {
    const { message } = this.state.error;
    let displayMessage;
    if (message === 'empty query') {
      displayMessage = 'No search results found';
    } else {
      displayMessage = `Error: ${message}`;
    }

    return (
      <div className="search-books-results">
        <ol className="books-grid">
          <div>{displayMessage}</div>
        </ol>
      </div>
    );
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.handleChange(e.target.value)}
            />
          </div>
        </div>
        {
          this.state.error
          ? this.renderError()
          : this.renderResults()
        }
      </div>
    );
  }
};

Search.propTypes = {
  history: PropTypes.object.isRequired
};

const SearchWithRouter = withRouter(Search);

export default SearchWithRouter;
