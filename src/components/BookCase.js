import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../api/WrappedBookAPI';
import BookShelf from './BookShelf';

class BookCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: {
        currentlyReading: [],
        wantToRead: [],
        read: []
      }
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    api.getAll().then(shelves => {
      this.setState({shelves});
    });
  }

  render() {
    const { title } = this.props;
    const { shelves } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              Object.keys(shelves).map(key => {
                return <BookShelf key={key} shelf={key}
                  books={shelves[key]} refreshData={this.refreshData}
                />;
              })
            }
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
};

BookCase.propTypes = {
  title: PropTypes.string.isRequired,
  shelves: PropTypes.object
};

BookCase.defaultProps = {
  shelves: {
    currentlyReading: [],
    wantToRead: [],
    read: []
  },
};

export default BookCase;
