const express = require('express');
const Pokemon = require('../models/pokemon-model');

const router = express.Router();

// Middleware
async function getPokemon(req, res, next) {
  let pokemon;
  try {
    pokemon = await Pokemon.findById(req.params.id);
    if (pokemon == null) {
      return res.status(404).json({ message: 'Cannot find this pokemon' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.pokemon = pokemon;
  next();
}

// Create one
router.post('/', async (req, res) => {
  const pokemon = new Pokemon({
    name: req.body.name,
    id: req.body.id,
    caught: req.body.caught,
    damage: req.body.damage,
  });

  try {
    const newPokemon = await pokemon.save();
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read (getting all)
router.get('/', async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read (getting only caught Pokemon)
router.get('/caught', async (req, res) => {
  let pokemon;
  try {
    pokemon = await Pokemon.find({ caught: true });

    if (pokemon.length === 0) {
      return res.status(404).json({ message: 'There are no caught Pokemon' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.json(pokemon);
});

// Read (getting one by ID)
router.get('/:id', getPokemon, (req, res) => {
  res.json(res.pokemon);
});

// Read (getting one by name)
router.get('/', async (req, res) => {
  let pokemon;
  try {
    pokemon = await Pokemon.findOne({ name: req.body.name });
    if (pokemon == null) {
      return res.status(404).json({ message: 'Cannot find this pokemon' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.json(pokemon);
});

// Update one
router.patch('/:id', getPokemon, async (req, res) => {
  if (req.body.name != null) {
    res.pokemon.name = req.body.name;
  }
  if (req.body.id != null) {
    res.pokemon.id = req.body.id;
  }
  if (req.body.damage != null) {
    res.pokemon.damage = req.body.damage;
  }
  if (req.body.caught != null) {
    res.pokemon.caught = req.body.caught;
  }

  try {
    const updatedPokemon = await res.pokemon.save();
    res.json(updatedPokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete one
router.delete('/:id', getPokemon, async (req, res) => {
  try {
    await res.pokemon.remove();
    res.json({ message: 'Deleted Pokemon' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
