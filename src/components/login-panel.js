import React from 'react';

export default function LoginPanel(props) {
  return (
    <div className="login-panel">
      <h3 className="header">
        Login
      </h3>
      <hr/>
      <form onSubmit={props.onSubmit}>
        <div>
          <label
            className="username-label"
            htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            onChange={props.onChange} />
          <label
            className="password-label"
            htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
            onChange={props.onChange} />
        </div>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}