import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);

    this.state = {
      text: this.props.text,
      isEditting: false
    };
  }

  handleDelete(event) {
    this.props.onPostDelete(event, this.props._id);
  }

  handleEdit(event) {
    if (this.state.isEditting) {
      this.props.onPostEdit(event, this.props._id, this.state.text);
    }
    this.setState({isEditting: !(this.state.isEditting)});
  }

  handleEditChange(event) {
    this.setState({text: event.target.value});
  }

  formatDate(date) {
    const created = new Date(date);
    let createdAMPM;
    let hour = created.getHours();

    if (hour < 12) {
      createdAMPM = 'am';
    } else {
      createdAMPM = 'pm';
      hour -= 12;
    }

    return `${hour}:${created.getMinutes()} ${createdAMPM} - \
            ${created.getDate()}/${created.getMonth()}/${created.getFullYear()}`;
  }

  render() {
    let editElem = <textarea className="edit-post-box" value={this.state.text} onChange={this.handleEditChange}/>
    let textElem = <p>{this.state.text}</p>;

    return (
      <li className="post">
        <header className="post-header">
          <span className="username">{this.props.username}</span>
          <span className="created">{this.formatDate(this.props.created)}</span>
        </header>
        <div>
          {this.state.isEditting ? editElem : textElem}
          <input
            className="edit-post"
            type="button"
            value={this.state.isEditting ? "save edit" : "edit post"}
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