const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  caught: {
    type: Boolean,
    required: true,
    default: false,
  },
  damage: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
