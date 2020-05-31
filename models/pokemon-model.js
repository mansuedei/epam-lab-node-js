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
  damage: {
    type: Number,
    required: false,
  },
  caught: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
