import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../db.js";

const router = Router();

router.post("/", (req, res) => {
  const { items, userId } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Order must contain at least one item" });
  }

  const orderId = uuidv4();
  let totalPrice = 0;

  for (const item of items) {
    if (!item.base || !item.proteins || item.proteins.length === 0) {
      return res.status(400).json({ error: "Each bowl needs a base and at least one protein" });
    }
    totalPrice += item.item_price || 0;
  }

  const insertOrder = db.prepare(`
    INSERT INTO orders (id, user_id, total_price, status)
    VALUES (?, ?, ?, 'Preparing')
  `);

  const insertItem = db.prepare(`
    INSERT INTO order_items (order_id, bowl_name, base, proteins, mixins, sauce, toppings, item_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const placeOrder = db.transaction(() => {
    insertOrder.run(orderId, userId || null, totalPrice);
    for (const item of items) {
      insertItem.run(
        orderId,
        item.bowl_name || "Custom Bowl",
        item.base,
        JSON.stringify(item.proteins),
        JSON.stringify(item.mixins || []),
        item.sauce || null,
        JSON.stringify(item.toppings || []),
        item.item_price || 0
      );
    }
  });

  placeOrder();

  res.status(201).json({
    id: orderId,
    total_price: totalPrice,
    status: "Preparing",
    items: items.length,
  });
});

router.get("/:id", (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  const items = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(req.params.id);
  const parsed = items.map((i) => ({
    ...i,
    proteins: JSON.parse(i.proteins),
    mixins: JSON.parse(i.mixins),
    toppings: JSON.parse(i.toppings),
  }));

  res.json({ ...order, items: parsed });
});

router.get("/", (req, res) => {
  const userId = req.query.userId;
  let orders;
  if (userId) {
    orders = db.prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC").all(userId);
  } else {
    orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT 50").all();
  }
  res.json(orders);
});

export default router;
