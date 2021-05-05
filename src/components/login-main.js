import React from 'react';
import '../css/index.css';
import '../css/login.css';
import LoginPanel from './login-panel.js';
import LoginLeftPanel from './login-left-panel.js';
import LoginRightPanel from './login-right-panel.js';

export default function Login() {
  return (
    <div className="login-main">
      <LoginLeftPanel />
      <LoginPanel />
      <LoginRightPanel />
    </div>
  );
}