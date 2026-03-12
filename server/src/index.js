import express from "express";
import cors from "cors";
import ingredientRoutes from "./routes/ingredients.js";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/ingredients", ingredientRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", name: "PokeFlow API" });
});

app.listen(PORT, () => {
  console.log(`PokeFlow API running on http://localhost:${PORT}`);
});
