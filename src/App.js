import React from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/home-main.js';
import Login from './components/login-main.js';
import './css/index.css';
import './css/login.css';
import './css/posts-panel.css';
import './css/post.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleNewPostSubmit = this.handleNewPostSubmit.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handlePostEdit = this.handlePostEdit.bind(this);

    this.state = {
      user: {
        _id: '',
        username: '',
        password: '',
        posts: [] // array of objects of the form {_id: ..., text: '...', created: <some date>}
      },
      isLoggedIn: false
    };
  }

  // changes state for login details
  //  - username, password
  //  - (upon successful login) _id, posts
  handleLoginChange(event) {
    let userObject = this.state.user;
    userObject[event.target.name] = event.target.value;
    this.setState({user: userObject});
  }
  
  // performs POST request to authenticate the user and login,
  // retrieving other user information such as posts
  async handleLoginSubmit(event) {
    event.preventDefault();

    const path = '/login';
    const username = this.state.user.username;
    const password = this.state.user.password;
    const requestBody = {username, password};

    try {
      const res = await this.makeRequest(path, 'POST', requestBody);
    
      const userData = await res.json();
      if (userData.username) {
        this.setState({
          user: {
            _id: userData._id,
            username: username,
            password: password,
            posts: userData.posts
          },
          isLoggedIn: true
        });
        this.props.history.push('/home/' + username);
        console.log('successfully logged in');
      } else {
        this.setState({isLoggedIn: false});
        console.log('Error: failed to log in');
      }
    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  // performs POST request to submit a new post created by
  // the currently logged in user
  async handleNewPostSubmit(event, text) {
    event.preventDefault();

    const path = '/home/posts/create';
    const userID = this.state.user._id;
    const requestBody = {userID, text};

    try {
      let res = await this.makeRequest(path, 'POST', requestBody);
    
      // add new post to state's user.posts array
      const postData = await res.json();
      if (postData) {
        console.log(postData.message);
        let userObject = this.state.user;
        userObject.posts.push({
          _id: postData._id,
          text: postData.text,
          created: postData.created
        });
        this.setState({user: userObject});
      }
    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  async handlePostDelete(event, postID) {
    event.preventDefault();

    const path = '/home/posts/delete';
    const userID = this.state.user._id;
    const requestBody = {
      _id: postID,
      user: userID,
      username: this.state.user.username
    };

    try {
      let res = await this.makeRequest(path, 'DELETE', requestBody);
      const resJSON = await res.json();

      if (!resJSON.error) {
        let userObject = this.state.user;
        userObject.posts.splice(userObject.posts.findIndex(post => {
          return post._id === postID;
        }), 1);
        this.setState({user: userObject});
      }
    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  async handlePostEdit(event, postID, postEdit) {
    event.preventDefault();

    const path = '/home/posts/edit';
    const userID = this.state.user._id;
    const requestBody = {
      _id: postID,
      user: userID,
      username: this.state.user.username,
      textEdit: postEdit
    };

    try {
      let res = await this.makeRequest(path, 'PUT', requestBody);
      const resJSON = await res.json();

      if (!resJSON.error) {
        let userObject = this.state.user;
        userObject.posts.map(post => {
          let tempPost = post;

          if (postID === post._id) {
            tempPost.text = resJSON.edittedPost;           
          }

          return tempPost;
        });
        this.setState({user: userObject});
      }
    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  // ~~~HELPERS~~~

  // uses built-in fetch API call to make a request to URL
  // with body "requestBody" and method "method"
  async makeRequest(relativeURL, method, requestBody) {
    const DOMAIN = process.env.REACT_APP_ROOT_API_DOMAIN;
    const PORT = process.env.REACT_APP_ROOT_API_PORT;

    const response = await fetch(`${DOMAIN}:${PORT}${relativeURL}/`, {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(requestBody)
    });

    return response;
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Redirect to="/login/"/>
          </Route>
          <Route path="/home/">
            {this.state.isLoggedIn  ?
              <Home
                user={this.state.user}
                onNewPostSubmit={this.handleNewPostSubmit}
                onPostDelete={this.handlePostDelete}
                onPostEdit={this.handlePostEdit}
              />                    : 
              <Redirect to="/"/>
            }
          </Route>
          <Route path="/login/">
            <Login
              onChange={this.handleLoginChange}
              onSubmit={this.handleLoginSubmit}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
