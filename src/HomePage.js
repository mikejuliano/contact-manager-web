// HomePage.js
import React, {Component} from 'react';

export default class HomePage extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        <p>{ user }</p>
      </div>
    );
  }
}