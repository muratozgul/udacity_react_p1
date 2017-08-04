import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Changer from './Changer';

class Book extends Component {
  render() {
    const {
      id, title, authors, backgroundImageURL, shelf, refreshData
    } = this.props;
    const coverStyle = {
      width: 128,
      height: 193,
      backgroundImage: `url("${backgroundImageURL}")`
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={coverStyle} />
          <Changer shelf={shelf} bookId={id} refreshData={refreshData} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {Array.isArray(authors) ? authors.join(', ') : authors}
        </div>
      </div>
    );
  }
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  backgroundImageURL: PropTypes.string.isRequired
};

export default Book;
