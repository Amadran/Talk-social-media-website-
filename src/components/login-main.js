import React from 'react';
import LoginPanel from './login-panel.js';
import LoginLeftPanel from './login-left-panel.js';
import LoginRightPanel from './login-right-panel.js';

export default function Login(props) {
  return (
    <div className="login-main">
      <LoginLeftPanel />
      <LoginPanel onChange={props.onChange} onSubmit={props.onSubmit}/>
      <LoginRightPanel />
    </div>
  );
}