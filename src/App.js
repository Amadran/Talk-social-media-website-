import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home-main.js';
import Login from './components/login-main.js';

function App() {
  return (
    <div className="app-main">
      <Router>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
      </Router>
    </div>
  );
}

export default App;
