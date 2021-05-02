import React from 'react';
import '../css/index.css';
import UserPanel from './user-panel.js';
import OptionsPanel from './options-panel.js';
import PostsPanel from './posts-panel.js';

export default function Home() {
  return (
    <div className="home-main">
      <OptionsPanel />
      <PostsPanel />
      <UserPanel />
    </div>
  );
}