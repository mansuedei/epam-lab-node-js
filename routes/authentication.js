const express = require('express');

const authentication = express();

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

authentication.post('/register', (req, res) => {
	req.body.name
});

module.exports = authentication;
