import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const TITLES = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want To Read',
  read: 'Read'
};

class BookShelf extends Component {
  render() {
    const { shelf, title, books, refreshData } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{TITLES[shelf]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map(book => {
                return (
                  <li key={book.id}>
                    <Book refreshData={refreshData} {...book} />
                  </li>
                );
              })
            }
          </ol>
        </div>
      </div>
    );
  }
};

BookShelf.propTypes = {
  shelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read']).isRequired,
  books: PropTypes.arrayOf(PropTypes.object)
};

BookShelf.defaultProps = {
  books: [],
};

export default BookShelf;
