import React from 'react';
import Post from './post.js';
import NewPostBox from './new-post-box.js';

export default function PostsPanel(props) {
  return (
    <div className="posts-panel">
      <h3 className="header">Feed</h3>
      <hr/>
      <NewPostBox onNewPostSubmit={props.onNewPostSubmit} />
      <ul className="posts-list">
        {props.user.posts.map(post => {
          return <Post
                    text={post.text}
                    key={post._id}
                    _id={post._id}
                    username={props.user.username}
                    created={post.created}
                    onPostDelete={props.onPostDelete}
                  />;
        })}
      </ul>
    </div>
  );
}