import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {};
  }

  handleDelete(event) {
    this.props.onPostDelete(event, this.props._id);
  }

  handleEdit(event) {
    event.preventDefault();
  }

  formatDate(date) {
    const created = new Date(date);
    let createdAMPM;
    if (created.getHours < 12) {
      createdAMPM = 'am';
    } else {
      createdAMPM = 'pm';
    }

    return `${created.getHours()}:${created.getMinutes()} - ${created.getDate()}/${created.getMonth()}/${created.getFullYear()}`;
  }

  render() {
    return (
      <li className="post">
        <header className="post-header">
          <span className="username">{this.props.username}</span>
          <span className="created">{this.formatDate(this.props.created)}</span>
        </header>
        <div>
          <p>
            {this.props.text}
          </p>
          <input
            className="edit-post"
            type="button"
            value="edit post"
            onClick={this.handleEdit}
          />
          <input
            className="delete-post"
            type="button"
            value="delete post"
            onClick={this.handleDelete}
          />
        </div>
      </li>
    );
  }
}