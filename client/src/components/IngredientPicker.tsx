import type { Ingredient, BuilderStep } from "../types";

interface Props {
  step: BuilderStep;
  ingredients: Ingredient[];
  selected: string[];
  onToggle: (name: string) => void;
  multi?: boolean;
}

const STEP_CONFIG: Record<string, { emoji: string; hint: string }> = {
  base: { emoji: "🍚", hint: "Choose your foundation" },
  protein: { emoji: "🐟", hint: "Pick 1-3 proteins" },
  mixin: { emoji: "🥒", hint: "Add your mix-ins (optional)" },
  sauce: { emoji: "🥫", hint: "Pick your sauce" },
  topping: { emoji: "🥑", hint: "Finish with toppings (optional)" },
};

export default function IngredientPicker({ step, ingredients, selected, onToggle, multi = false }: Props) {
  const config = STEP_CONFIG[step] || { emoji: "🍽️", hint: "" };

  return (
    <div>
      <p className="text-center text-gray-500 mb-6">{config.hint}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ingredients.map((ing) => {
          const isSelected = selected.includes(ing.name);
          const outOfStock = !ing.in_stock;

          return (
            <button
              key={ing.id}
              onClick={() => !outOfStock && onToggle(ing.name)}
              disabled={outOfStock}
              className={`
                relative p-4 rounded-xl border-2 text-left transition-all
                ${outOfStock
                  ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                  : isSelected
                    ? "border-seafoam bg-seafoam/10 shadow-md scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-seafoam/50 hover:shadow-sm cursor-pointer"
                }
              `}
            >
              <div className="text-2xl mb-1">{config.emoji}</div>
              <div className="font-semibold text-charcoal text-sm">{ing.name}</div>
              {ing.price_extra > 0 && (
                <div className="text-xs text-coral font-medium mt-1">+${ing.price_extra.toFixed(2)}</div>
              )}
              {outOfStock && (
                <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  OUT
                </div>
              )}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-seafoam rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
