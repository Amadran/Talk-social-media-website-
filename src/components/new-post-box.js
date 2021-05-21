import React from 'react';

export default class NewPostBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      text: ''
    };
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  handleSubmit(event) {
    this.props.onNewPostSubmit(event, this.state.text);
  }

  render() {
    return (
      <div className="new-post-box">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-post">New Post</label>
          <textarea
            name="new-post"
            type="text"
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit Post" />
        </form>
      </div>
    );
  }
}