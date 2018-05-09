// HomePage.js
import React, {Component} from 'react';
import {Contact} from './Contact';
import {LoadingWrapper} from './LoadingWrapper';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {contacts: [], isLoadingContacts: false};
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts() {
    const url = '/api/v1/contacts/';
    const options = {method: 'GET'};
    const headers = {'Content-Type': 'application/json'};
    this.setState({isLoadingContacts: true});
    return fetch(url, {headers, ...options})
      .then(r => r.json())
      .then(contacts => {
        this.setState({contacts, isLoadingContacts: false});
      });
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        <div>
          <h1>Home Page</h1>
          <p>{ user }</p>
        </div>
        <div>
          <h3>Contacts</h3>
          <LoadingWrapper isLoading={ this.state.isLoadingContacts } message={ 'Loading Contacts...' }>
            { this.state.contacts.map((contact, index) => (
              <Contact key={ index } contact={ contact }/>
            )) }
          </LoadingWrapper>
        </div>
      </div>
    );
  }
}