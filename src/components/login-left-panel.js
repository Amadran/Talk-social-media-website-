import React from 'react';
import '../css/index.css';
import '../css/login.css';

export default class LoginLeftPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="login-left-panel">
        left
      </div>
    );
  }
}