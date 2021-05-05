import React from 'react';
import '../css/index.css';
import '../css/login.css';

export default class LoginRightPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="login-right-panel">
        right
      </div>
    );
  }
}