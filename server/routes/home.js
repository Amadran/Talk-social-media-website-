const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user-model.js');
const Post = require('../models/post-model.js');

// create new post
router.post('/posts/create/', async (req, res) => {
  try {
    const newPostID = new mongoose.Types.ObjectId();
    const userID = new mongoose.Types.ObjectId(req.body.userID);
    const user = await User.findById(req.body.userID);

    const dateCreated = new Date();
    const newPost = new Post({
      _id: newPostID,
      user: userID,
      text: req.body.text,
      created: dateCreated
    });

    await newPost.save();
    user.posts.push(newPostID);
    await user.save();
    res.json({
      message: 'post successfully created',
      _id: newPostID,
      text: req.body.text,
      created: dateCreated
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error: ' + err);
  }
});

// delete post
router.delete('/posts/delete/', async (req, res) => {
  try {
    const post = await Post.findById(req.body._id).populate('user');

    if (!post) {
      res.status(400).json({
        _id: req.body._id,
        username: req.body.username,
        error: 'this post does not exist'
      });
    } else if (post.user._id.toString() !== req.body.user) {
      res.status(400).json({
        _id: req.body._id,
        user: post.user._id,
        username: req.body.username,
        error: 'user not authorized to delete this post'
      });
    } else {
      await Post.findByIdAndDelete(req.body._id);
      res.json(`post with id ${req.body._id} successfully deleted`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error: ' + err);
  }
});

module.exports = router;