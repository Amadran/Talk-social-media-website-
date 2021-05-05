import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from './components/home-main.js';
import Login from './components/login-main.js';

function App() {
  return (
    <div className="app">
      <Router>
        <Route path="/" exact>
          <Home />
          {/* <Redirect to="/login"/> */}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
