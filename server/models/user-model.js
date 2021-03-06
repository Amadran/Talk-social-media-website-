const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 30,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 30,
    required: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }]
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});

let User = mongoose.model('User', userSchema);
module.exports = User;

