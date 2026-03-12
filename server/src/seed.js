import db from "./db.js";

db.exec("DELETE FROM order_items");
db.exec("DELETE FROM orders");
db.exec("DELETE FROM ingredients");

const ingredients = [
  // Bases
  { name: "Sushi Rice", category: "base", price_extra: 0, in_stock: 1 },
  { name: "Brown Rice", category: "base", price_extra: 0, in_stock: 1 },
  { name: "Mixed Greens", category: "base", price_extra: 0, in_stock: 1 },
  { name: "Zucchini Noodles", category: "base", price_extra: 0.50, in_stock: 1 },

  // Proteins
  { name: "Ahi Tuna", category: "protein", price_extra: 0, in_stock: 1 },
  { name: "Salmon", category: "protein", price_extra: 0, in_stock: 1 },
  { name: "Spicy Tuna", category: "protein", price_extra: 0.50, in_stock: 1 },
  { name: "Tofu", category: "protein", price_extra: 0, in_stock: 1 },
  { name: "Boiled Shrimp", category: "protein", price_extra: 1.00, in_stock: 0 },

  // Mix-ins
  { name: "Edamame", category: "mixin", price_extra: 0, in_stock: 1 },
  { name: "Diced Cucumber", category: "mixin", price_extra: 0, in_stock: 1 },
  { name: "Red Onion", category: "mixin", price_extra: 0, in_stock: 1 },
  { name: "Scallions", category: "mixin", price_extra: 0, in_stock: 1 },
  { name: "Mango", category: "mixin", price_extra: 0.75, in_stock: 1 },
  { name: "Pineapple", category: "mixin", price_extra: 0.75, in_stock: 0 },

  // Sauces
  { name: "Spicy Mayo", category: "sauce", price_extra: 0, in_stock: 1 },
  { name: "Ponzu", category: "sauce", price_extra: 0, in_stock: 1 },
  { name: "Shoyu (Soy Sauce)", category: "sauce", price_extra: 0, in_stock: 1 },
  { name: "Wasabi Aioli", category: "sauce", price_extra: 0, in_stock: 1 },
  { name: "Sriracha", category: "sauce", price_extra: 0, in_stock: 1 },

  // Toppings
  { name: "Avocado", category: "topping", price_extra: 1.50, in_stock: 1 },
  { name: "Seaweed Salad", category: "topping", price_extra: 0, in_stock: 1 },
  { name: "Furikake", category: "topping", price_extra: 0, in_stock: 1 },
  { name: "Crispy Onions", category: "topping", price_extra: 0, in_stock: 1 },
  { name: "Masago", category: "topping", price_extra: 0.75, in_stock: 1 },
  { name: "Sesame Seeds", category: "topping", price_extra: 0, in_stock: 1 },
  { name: "Pickled Ginger", category: "topping", price_extra: 0, in_stock: 0 },
];

const insert = db.prepare(`
  INSERT INTO ingredients (name, category, price_extra, in_stock)
  VALUES (@name, @category, @price_extra, @in_stock)
`);

const insertMany = db.transaction((items) => {
  for (const item of items) insert.run(item);
});

insertMany(ingredients);
console.log(`Seeded ${ingredients.length} ingredients.`);

db.close();
