const router = require('express').Router();
const User = require('../models/user-model.js');

// create a new user with password
router.post('/new/', async (req, res) => {
  try {
    const userExists = await User.exists({username: req.body.username});
    if (userExists) {
      res.status(400).json('Error: user already exists');
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        posts: []
      });

      const userSaved = await newUser.save();
      if (userSaved) {
        res.json('User successfully created');
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error: ' + err);
  }
});

// login if password matches
router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({username: req.body.username}).populate('posts');

    if (req.body.password === userData.password) {
      const user = userData.toObject();
      delete user.password;
      res.json(user);
    } else {
      res.status(401).json('Error: incorrect password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error: ' + err);
  }
});

module.exports = router;