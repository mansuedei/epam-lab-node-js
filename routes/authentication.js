require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const Users = require('../models/users-model');
const initializePassport = require('../passport-config');

initializePassport(
  passport,
  searchedEmail => {
    const savedEmail = Users.findOne({ email: searchedEmail });
    return searchedEmail === savedEmail;
  },
  searchedID => {
    const savedID = Users.findOne({ id: searchedID });
    return searchedID === savedID;
  }
);

const authentication = express();

authentication.set('view-engine', 'ejs');
authentication.use(express.urlencoded({ extended: false }));
authentication.use(flash());
authentication.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
authentication.use(passport.initialize());
authentication.use(passport.session());

authentication.get('/', (req, res) => {
  res.render('index.ejs');
});

authentication.post('/', (req, res) => {
  const { name } = req.body;
  const token = jwt.sign({ name: name }, 'privateKey', { expiresIn: '60s' });
  res.send(token);
});

authentication.get('/login', (req, res) => {
  res.render('login.ejs');
});

authentication.get('/register', (req, res) => {
  res.render('register.ejs');
});

authentication.get('/home', (req, res) => {
  res.render('home.ejs');
});

authentication.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

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
