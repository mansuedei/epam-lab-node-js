const express = require('express');
const bcrypt = require('bcrypt');
// const initializePassport = require('');
const Users = require('../models/users-model');

const authentication = express();
const localUsersStorage = [];

authentication.set('view-engine', 'ejs');
authentication.use(express.urlencoded({ extended: false }));

authentication.get('/', (req, res) => {
  res.render('index.ejs', { name: 'Iana' });
});

authentication.get('/login', (req, res) => {
  res.render('login.ejs');
});

authentication.post('/login', (req, res) => {});

authentication.get('/register', (req, res) => {
  res.render('register.ejs');
});

// Middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await Users.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find this user' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

// Create one (registration)
authentication.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.redirect('/register');
  }
});

// Read (getting all)
authentication.get('/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete one
authentication.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted the user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authentication;
