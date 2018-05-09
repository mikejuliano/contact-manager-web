// HomePage.js
import React, {Component} from 'react';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {contacts: []};
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts() {
    const url = '/api/v1/contacts/';
    const options = {method: 'GET'};
    const headers = {'Content-Type': 'application/json'};
    return fetch(url, {headers, ...options})
      .then(r => r.json())
      .then(contacts => {
        this.setState({contacts});
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
          { this.state.contacts.map((contact, index) => <div key={ index }>
            { `Name: ${contact.first_name} ${contact.last_name} | Email: ${contact.email}` }
          </div>) }
        </div>
      </div>
    );
  }
}