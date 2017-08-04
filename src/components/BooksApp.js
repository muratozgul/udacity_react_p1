import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import BookCase from './BookCase';
import Search from './Search';
import api from '../api/WrappedBookAPI';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this._refreshData.bind(this);
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

  _refreshData() {
    api.getAll().then(shelves => {
      this.setState({shelves});
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/"
            render={() => {
              return <BookCase
                title="My Reads"
                shelves={this.state.shelves}
                refreshData={this.refreshData}
              />
            }}
          />
          <Route path="/search" component={Search} />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
