const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  text: {
    type: String,
    trim: true,
    maxLength: 250,
    required: true
  }
});

let Post = mongoose.model('Post', postSchema);
module.exports = Post;
