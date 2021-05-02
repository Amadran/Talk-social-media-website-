import React from 'react';
import '../css/post.css';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <li className="post">
        <header className="post-header">
          {this.props.user}
        </header>
        <p>
          {this.props.text}
        </p>
      </li>
    );
  }
}