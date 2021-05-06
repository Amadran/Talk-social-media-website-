import React from 'react';
import {Redirect} from 'react-router-dom';
import '../css/index.css';
import '../css/login.css';

export default class LoginPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      isLoggedIn: false
    };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(`~~Input change~~\nUsername: ${this.state.username}\nPassword: ${this.state.password}`);
  }

  handleSubmit(event) {
    console.log(`~~Submission~~:\nUsername: ${this.state.username}\nPassword: ${this.state.password}`);
    event.preventDefault();

    const DOMAIN = process.env.REACT_APP_ROOT_API_DOMAIN;
    const PORT = process.env.REACT_APP_ROOT_API_PORT;
    const requestBody = {
      username: this.state.username,
      password: this.state.password
    };

    fetch(`${DOMAIN}:${PORT}/login/${this.state.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    .then(userData => {
      if (userData.username) {
        this.setState({isLoggedIn: true});
        console.log('successfully logged in');
      } else {
        this.setState({isLoggedIn: false});
        console.log('failed to login');
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    let element;
    
    if (this.state.isLoggedIn) {
      element = <Redirect to="/"/>;
    } else {
      element = (
        <div className="login-panel">
          <h3 className="header">
            Login
          </h3>
          <hr/>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label
                className="username-label"
                htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange} />
              <label
                className="password-label"
                htmlFor="password">Password</label>
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleChange} />
            </div>
            <input type="submit" value="Login"/>
          </form>
        </div>
      );
    }

    return element;
  }
}