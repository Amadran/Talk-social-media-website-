const router = require('express').Router();
let User = require('../models/user-model.js');
let Post = require('../models/post-model.js');

// create new post
router.post('/posts/create/',(req, res) => {
  User.exists({username: req.body.username})
      .then(ifExist => {
        if (!ifExist) {
          const newPost = new Post({
            user: req.body.username,
            text: req.body.text
          });
        
          newPost.save()
            .then(() => res.json('Post successfully created.'))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
          res.status(400).json('this user does not exist');
        }
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// delete post
router.delete('/posts/delete/:id',(req, res) => {
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