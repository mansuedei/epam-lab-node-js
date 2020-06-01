require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const authorization = express();

authorization.post('/', (req, res) => {
  const { name } = req.body;
  const token = jwt.sign({ name }, process.env.PRIVATE_KEY, {
    expiresIn: '60s',
  });
  res.send(token);
});

module.exports = authorization;
