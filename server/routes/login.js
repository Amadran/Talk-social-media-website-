const router = require('express').Router();
let User = require('../models/user-model.js');
let Post = require('../models/post-model.js');

// create a new user with password
router.post('/new/',(req, res) => {
  User.exists({username: req.body.username})
      .then(ifExist => {
        if (ifExist) {
          res.status(400).json({
            username: req.body.username,
            error: 'user already exists'
          });
        } else {
          const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            posts: []
          });

          newUser.save()
            .then(() => res.json('User successfully created.'))
            .catch(err => res.status(400).json('In Exists Error: ' + err));
        }
      })
      .catch(err => res.status(400).json('Out Exists Error: ' + err));
});

// login and get data if password matches
router.post('/:username',(req, res) => {
  User.findOne({username: req.params.username}).populate('posts')
    .then(userData => {
      if (req.body.password === userData.password) {
        res.json(userData);
      } else {
        res.status(401).json('incorrect password');
      }
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});

module.exports = router;