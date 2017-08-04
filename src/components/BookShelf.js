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
    const { section, title, books, refreshData } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{TITLES[section]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map(book => {
                return (
                  <li key={book.id}>
                    <Book section={section} refreshData={refreshData} {...book} />
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
  section: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read']).isRequired,
  books: PropTypes.arrayOf(PropTypes.object)
};

BookShelf.defaultProps = {
  books: [],
};

export default BookShelf;
