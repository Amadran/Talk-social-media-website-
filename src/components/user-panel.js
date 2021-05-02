import React from 'react';
import tommer from '../img/tommer.jpg';
import '../css/user-panel.css';

export default class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "sample user"
    };
  }

  render() {
    return (
      <div className="user-panel">
        <div className="user-avatar">
          <img src={tommer} alt="tommer"/>
        </div>
        <div className="user-name">
          {this.state.username}
        </div>
        <button className="account-button">
          account
        </button>
      </div>
    );
  }
}