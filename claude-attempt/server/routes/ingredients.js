const express = require('express');
const { Ingredient } = require('../models');

const router = express.Router();

// Get all ingredients grouped by category
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      order: [['category', 'ASC'], ['name', 'ASC']],
    });

    // Group by category
    const grouped = ingredients.reduce((acc, ingredient) => {
      const { category } = ingredient;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(ingredient);
      return acc;
    }, {});

    res.json(grouped);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get ingredients by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const ingredients = await Ingredient.findAll({
      where: { category },
      order: [['name', 'ASC']],
    });

    res.json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update ingredient stock status (admin only - simplified for demo)
router.patch('/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;

    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    ingredient.inStock = inStock;
    await ingredient.save();

    res.json(ingredient);
  } catch (error) {
    console.error('Error updating ingredient stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;