const router = require('express').Router();
let User = require('../models/user-model.js');
let Post = require('../models/post-model.js');

// create a new user with password
router.route('/login/new/').post((req, res) => {
  User.exists({username: req.body.username})
      .then(ifExist => {
        if (ifExist) {
          res.status(400).json({
            username: username,
            error: "user already exists"
          });
        } else {
          const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            posts: []
          });
        
          newUser.save()
            .then(() => res.json('User successfully created.'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// login and get data if password matches
router.route('/login/:username').get((req, res) => {
  User.find({username: req.params.username}).populate('posts')
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