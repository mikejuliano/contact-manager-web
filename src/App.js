// App.js

import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AuthService from './AuthService';
import StorageService from './StorageService';
import {PrivateRoute} from './PrivateRoute';
import {PublicRoute} from './PublicRoute';
import {LoadingWrapper} from './LoadingWrapper';
import {LogoutButton} from './LogoutButton';

export default class App extends Component {
  constructor() {
    super();
    // AuthService requires an instance of StorageService
    // we create AuthService here so that there is only one copy throughout the app
    this.authService = new AuthService({storageService: new StorageService()});

    // initialize our state object
    this.state = {hasLoaded: false, user: null, isAuthenticated: false};

    // kick off asynchronous initialization
    this.init();
  }

  init() {
    this.authService.init() // check for token and fetch user if token exists
      .then(user => this.setUser(user));
  }

  setUser(user, cb) {
    const isAuthenticated = !!user;
    this.setState({user, isAuthenticated, hasLoaded: true}, cb);
  }

  logout(history) {
    this.authService.logout(); // remove token from localStorage
    this.setUser(null, () => this.goToLogin(history)); // clear the user, then navigate to login page
  }

  attemptLogin(username, password) { // authenticate, set the user, navigate to home page
    return this.authService.authenticate(username, password)
      .then(user => this.setUser(user, () => this.goHome()))
      .catch(err => console.error(err));
  }

  goToLogin(history) { // navigate to login page (PublicRoute, aka no auth required)
    history.replace('/login');
  }

  goHome() { // navigate to home page (PrivateRoute, aka auth required)
    window.location = '/home';
  }

  render() {
    return (
      <LoadingWrapper isLoading={ !this.state.hasLoaded }>
        <div className="App">
          <Router>
            <div>
              <LogoutButton
                isAuthenticated={ this.state.isAuthenticated }
                handleLogout={ this.logout.bind(this) }
              />
              <PrivateRoute
                path="/home"
                exact={ true }
                component={ HomePage }
                isAuthenticated={ this.state.isAuthenticated }
                user={ this.state.user }
              />
              <PublicRoute
                path="/login"
                exact={ true }
                component={ LoginPage }
                handlers={ {
                  attemptLogin: this.attemptLogin.bind(this)
                } }
              />
            </div>
          </Router>
        </div>
      </LoadingWrapper>
    )
  }
}