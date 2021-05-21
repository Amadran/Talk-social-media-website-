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

    const newPost = new Post({
      _id: newPostID,
      user: userID,
      text: req.body.text
    });

    await newPost.save();
    user.posts.push(newPostID);
    await user.save();
    res.json({
      message: 'post successfully created',
      _id: newPostID,
      text: req.body.text
    });
  } catch (err) {
    res.status(500).json('Internal Server Error: ' + err);
  }
});

// delete post
router.delete('/posts/delete/:id/', (req, res) => {
  User.findById(req.params.id).populate('user')
      .then(post => {
        if (post.user.username !== req.body.username) {
          res.status(400).json({
            id: req.params.id,
            username: req.body.username,
            error: "user not authorized to delete this post"
          });
        } else {
          Post.findByIdAndDelete(req.params.id)
              .then(post => {
                res.json(`post with id ${req.params.id} successfully deleted`);
              })
              .catch(err => res.status(400).json('Error: ' + err));
        }
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;