import React from 'react';
import UserPanel from './user-panel.js';
import OptionsPanel from './options-panel.js';
import PostsPanel from './posts-panel.js';

export default function Home(props) {
  return (
    <div className="home-main">
      <OptionsPanel />
      <PostsPanel
        user={props.user} 
        onNewPostSubmit={props.onNewPostSubmit}
        onPostDelete={props.onPostDelete}  
        onPostEdit={props.onPostEdit}
      />
      <UserPanel user={props.user} />
    </div>
  );
}