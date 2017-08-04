import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Halogen from 'halogen';
import api from '../api/WrappedBookAPI';

class Changer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this._handleChange.bind(this);
    this.state = {
      waiting: false
    };
  }

  _handleChange(event) {
    event.preventDefault();
    this.setState({ waiting: true });
    const shelf = event.target.value;
    api.update(this.props.bookId, shelf)
      .then(res => {
        this.setState({ waiting: false });
        this.props.refreshData();
      });
  }

  renderSpinner() {
    return (
      <div className="book-shelf-changer" style={{ backgroundImage: 'none' }}>
        <div className="book-shelf-spinner">
          <Halogen.SkewLoader color="#fff" size="6px" margin="4px" />
        </div>
      </div>
    );
  }

  renderDropDown() {
    const { shelf } = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          {
            shelf === 'none'
            ? null
            : <option value="none" style={{ color: 'red' }}>Remove</option>
          }
        </select>
      </div>
    );
  }

  render() {
    return this.state.waiting ? this.renderSpinner() : this.renderDropDown();
  }
};

Changer.propTypes = {
  bookId: PropTypes.string.isRequired,
  shelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read', 'none']).isRequired,
  refreshData: PropTypes.func.isRequired
};

export default Changer;
