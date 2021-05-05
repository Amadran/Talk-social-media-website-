import React from 'react';
import '../css/index.css';
import '../css/login.css';

export default class LoginPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(`Input changed:\nUsername: ${this.state.username}\nPassword: ${this.state.password}`);
  }

  handleSubmit(event) {
    console.log(`Submitted:\nUsername: ${this.state.username}\nPassword: ${this.state.password}`);
    event.preventDefault();
  }

  render() {
    return (
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
}