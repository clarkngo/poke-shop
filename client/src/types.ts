export interface Ingredient {
  id: number;
  name: string;
  category: "base" | "protein" | "mixin" | "sauce" | "topping";
  price_extra: number;
  in_stock: number;
  image_url: string | null;
}

export interface IngredientsMap {
  base: Ingredient[];
  protein: Ingredient[];
  mixin: Ingredient[];
  sauce: Ingredient[];
  topping: Ingredient[];
}

export interface BowlBuild {
  bowl_name: string;
  base: string;
  proteins: string[];
  mixins: string[];
  sauce: string;
  toppings: string[];
  item_price: number;
}

export interface SignatureBowl {
  id: string;
  name: string;
  description: string;
  base: string;
  proteins: string[];
  mixins: string[];
  sauce: string;
  toppings: string[];
  price: number;
  image: string;
}

export interface OrderResponse {
  id: string;
  total_price: number;
  status: string;
  items: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export type BuilderStep = "base" | "protein" | "mixin" | "sauce" | "topping" | "review";

export const STEP_ORDER: BuilderStep[] = ["base", "protein", "mixin", "sauce", "topping", "review"];

export const STEP_LABELS: Record<BuilderStep, string> = {
  base: "Base",
  protein: "Protein",
  mixin: "Mix-ins",
  sauce: "Sauce",
  topping: "Toppings",
  review: "Review",
};

export const BASE_PRICE = 11.95;
