import { Router } from "express";
import db from "../db.js";

const router = Router();

router.get("/", (_req, res) => {
  const rows = db.prepare("SELECT * FROM ingredients ORDER BY category, name").all();
  const grouped = {};
  for (const row of rows) {
    if (!grouped[row.category]) grouped[row.category] = [];
    grouped[row.category].push(row);
  }
  res.json(grouped);
});

router.get("/signature-bowls", (_req, res) => {
  const bowls = [
    {
      id: "sig-1",
      name: "Classic Ahi",
      description: "Ahi Tuna over sushi rice with edamame, cucumber, scallions, and ponzu sauce, topped with sesame seeds",
      base: "Sushi Rice",
      proteins: ["Ahi Tuna"],
      mixins: ["Edamame", "Diced Cucumber", "Scallions"],
      sauce: "Ponzu",
      toppings: ["Sesame Seeds"],
      price: 13.95,
      image: "🐟",
    },
    {
      id: "sig-2",
      name: "Spicy Salmon Crunch",
      description: "Salmon and spicy tuna on brown rice with red onion and spicy mayo, topped with crispy onions and masago",
      base: "Brown Rice",
      proteins: ["Salmon", "Spicy Tuna"],
      mixins: ["Red Onion", "Scallions"],
      sauce: "Spicy Mayo",
      toppings: ["Crispy Onions", "Masago"],
      price: 15.95,
      image: "🍣",
    },
    {
      id: "sig-3",
      name: "Zen Garden",
      description: "Tofu on mixed greens with edamame, cucumber, mango, and wasabi aioli, topped with avocado and seaweed salad",
      base: "Mixed Greens",
      proteins: ["Tofu"],
      mixins: ["Edamame", "Diced Cucumber", "Mango"],
      sauce: "Wasabi Aioli",
      toppings: ["Avocado", "Seaweed Salad"],
      price: 14.50,
      image: "🥗",
    },
    {
      id: "sig-4",
      name: "Island Heat",
      description: "Spicy tuna and shrimp over zucchini noodles with mango, red onion, sriracha, and furikake",
      base: "Zucchini Noodles",
      proteins: ["Spicy Tuna", "Boiled Shrimp"],
      mixins: ["Mango", "Red Onion"],
      sauce: "Sriracha",
      toppings: ["Furikake", "Masago"],
      price: 16.50,
      image: "🌶️",
    },
  ];
  res.json(bowls);
});

export default router;
