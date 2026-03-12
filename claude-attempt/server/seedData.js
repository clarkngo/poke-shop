const { sequelize, Ingredient } = require('./models');

const seedIngredients = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    const ingredients = [
      // Bases
      { name: 'Sushi Rice', category: 'base', priceExtra: 0.00, description: 'Traditional sushi rice' },
      { name: 'Brown Rice', category: 'base', priceExtra: 0.00, description: 'Healthy brown rice' },
      { name: 'Mixed Greens', category: 'base', priceExtra: 0.00, description: 'Fresh mixed salad greens' },
      { name: 'Zucchini Noodles', category: 'base', priceExtra: 1.00, description: 'Spiralized zucchini noodles' },

      // Proteins
      { name: 'Ahi Tuna', category: 'protein', priceExtra: 0.00, description: 'Fresh yellowfin tuna' },
      { name: 'Salmon', category: 'protein', priceExtra: 0.00, description: 'Fresh Atlantic salmon' },
      { name: 'Spicy Tuna', category: 'protein', priceExtra: 0.50, description: 'Tuna with spicy mayo mix' },
      { name: 'Tofu', category: 'protein', priceExtra: -1.00, description: 'Marinated organic tofu' },
      { name: 'Boiled Shrimp', category: 'protein', priceExtra: 1.50, description: 'Fresh cooked shrimp' },

      // Mix-ins
      { name: 'Edamame', category: 'mixins', priceExtra: 0.50, description: 'Steamed soybeans' },
      { name: 'Diced Cucumber', category: 'mixins', priceExtra: 0.00, description: 'Fresh cucumber chunks' },
      { name: 'Red Onion', category: 'mixins', priceExtra: 0.00, description: 'Thinly sliced red onion' },
      { name: 'Scallions', category: 'mixins', priceExtra: 0.25, description: 'Fresh green onions' },

      // Sauces
      { name: 'Spicy Mayo', category: 'sauce', priceExtra: 0.00, description: 'Creamy spicy mayo sauce' },
      { name: 'Ponzu', category: 'sauce', priceExtra: 0.00, description: 'Citrus soy sauce' },
      { name: 'Shoyu (Soy Sauce)', category: 'sauce', priceExtra: 0.00, description: 'Traditional soy sauce' },
      { name: 'Wasabi Aioli', category: 'sauce', priceExtra: 0.25, description: 'Spicy wasabi mayo' },

      // Toppings
      { name: 'Avocado', category: 'topping', priceExtra: 1.50, description: 'Fresh sliced avocado' },
      { name: 'Seaweed Salad', category: 'topping', priceExtra: 1.00, description: 'Seasoned wakame seaweed' },
      { name: 'Furikake', category: 'topping', priceExtra: 0.50, description: 'Japanese seasoning flakes' },
      { name: 'Crispy Onions', category: 'topping', priceExtra: 0.75, description: 'Fried onion garnish' },
      { name: 'Masago', category: 'topping', priceExtra: 1.25, description: 'Orange fish roe' },
    ];

    await Ingredient.bulkCreate(ingredients);
    console.log('Ingredients seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedIngredients();