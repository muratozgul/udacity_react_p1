import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Halogen from 'halogen';
import api from '../api/WrappedBookAPI';

const spinnerStyle = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '4px',
    opacity: 0.5
};

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
    const { section } = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={section} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }

  render() {
    const { section, bookId } = this.props;
    return this.state.waiting ? this.renderSpinner() : this.renderDropDown();
  }
};

Changer.propTypes = {
  bookId: PropTypes.string.isRequired,
  section: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read']).isRequired,
  refreshData: PropTypes.func.isRequired
};

export default Changer;
