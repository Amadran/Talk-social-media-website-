import React from 'react';

export default function Post(props) {
  return (
    <li className="post">
      <header className="post-header">
        {props.username}
      </header>
      <p>
        {props.text}
      </p>
    </li>
  );
}