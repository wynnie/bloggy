import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  render() {
      //this.props.children for all child routes
    return (
        <div>
            {this.props.children}
        </div>
    );
  }
}
