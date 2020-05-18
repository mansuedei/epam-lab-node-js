require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const pokemonRouter = require('./routes/pokemon');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.use('/pokemon', pokemonRouter);

app.listen(3000, () => console.log('Server Started'));
