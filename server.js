require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('./models/pokemon-model');
const defaultPokemonData = require('./data/default-pokemon-data');
const pokemonRouter = require('./routes/pokemon');

const db = mongoose.connection;
const app = express();

app.use(express.json());

app.use('/pokemon', pokemonRouter);

app.listen(3000, () => console.log('Server Started'));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Pokemon.find({}).then(pokemonArray => {
      if (pokemonArray.length < 1) {
        Pokemon.insertMany(defaultPokemonData)
          .then(() =>
            console.log('No Pokemon found. Default Pokemon data was added')
          )
          .catch(error => console.log(error.message));
      }
    });
  });

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));
