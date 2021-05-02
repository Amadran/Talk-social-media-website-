import React from 'react';
import Post from './post';
import { v4 as uuidv4 } from 'uuid';
import '../css/posts-panel.css';

export default class PostsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "posts": ["test post lmao"],
      "user": "pogman"
    };
  }

  render() {
    return (
      <div className="posts-panel">
        <h3 className="header">Feed</h3>
        <hr/>
        <ul className="posts-list">
          {this.state.posts.map(post => {
            return (
              <Post
                text={post}
                key={uuidv4()}
                user={this.state.user}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}