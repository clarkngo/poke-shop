import { useState, useMemo } from "react";
import type { IngredientsMap, BowlBuild, BuilderStep } from "../types";
import { STEP_ORDER, STEP_LABELS, BASE_PRICE } from "../types";
import StepIndicator from "./StepIndicator";
import IngredientPicker from "./IngredientPicker";
import OrderSummary from "./OrderSummary";
import ReviewStep from "./ReviewStep";

interface Props {
  ingredients: IngredientsMap;
  onComplete: (bowl: BowlBuild) => void;
  loading: boolean;
}

export default function BowlBuilder({ ingredients, onComplete, loading }: Props) {
  const [step, setStep] = useState<BuilderStep>("base");
  const [base, setBase] = useState("");
  const [proteins, setProteins] = useState<string[]>([]);
  const [mixins, setMixins] = useState<string[]>([]);
  const [sauce, setSauce] = useState("");
  const [toppings, setToppings] = useState<string[]>([]);

  const extras = useMemo(() => {
    let total = 0;
    const lookup = (name: string) => {
      for (const cat of Object.values(ingredients)) {
        const found = cat.find((i) => i.name === name);
        if (found) return found.price_extra;
      }
      return 0;
    };
    if (base) total += lookup(base);
    for (const p of proteins) total += lookup(p);
    for (const m of mixins) total += lookup(m);
    if (sauce) total += lookup(sauce);
    for (const t of toppings) total += lookup(t);
    return total;
  }, [base, proteins, mixins, sauce, toppings, ingredients]);

  const bowl: Partial<BowlBuild> = { base, proteins, mixins, sauce, toppings };

  const canJump = (target: BuilderStep) => {
    const targetIdx = STEP_ORDER.indexOf(target);
    const currentIdx = STEP_ORDER.indexOf(step);
    if (targetIdx <= currentIdx) return true;
    if (targetIdx === 1 && base) return true;
    if (targetIdx === 2 && base && proteins.length > 0) return true;
    if (targetIdx >= 3 && base && proteins.length > 0) return true;
    return false;
  };

  const canProceed = () => {
    switch (step) {
      case "base": return !!base;
      case "protein": return proteins.length > 0;
      default: return true;
    }
  };

  const nextStep = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) setStep(STEP_ORDER[idx + 1]);
  };

  const prevStep = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) setStep(STEP_ORDER[idx - 1]);
  };

  const handleToggle = (name: string) => {
    switch (step) {
      case "base":
        setBase(name);
        break;
      case "protein":
        setProteins((prev) =>
          prev.includes(name) ? prev.filter((p) => p !== name) : prev.length < 3 ? [...prev, name] : prev
        );
        break;
      case "mixin":
        setMixins((prev) => (prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]));
        break;
      case "sauce":
        setSauce((prev) => (prev === name ? "" : name));
        break;
      case "topping":
        setToppings((prev) => (prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]));
        break;
    }
  };

  const getSelected = (): string[] => {
    switch (step) {
      case "base": return base ? [base] : [];
      case "protein": return proteins;
      case "mixin": return mixins;
      case "sauce": return sauce ? [sauce] : [];
      case "topping": return toppings;
      default: return [];
    }
  };

  const handleConfirm = () => {
    onComplete({
      bowl_name: "Custom Bowl",
      base,
      proteins,
      mixins,
      sauce,
      toppings,
      item_price: BASE_PRICE + extras,
    });
  };

  const stepIdx = STEP_ORDER.indexOf(step);

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-charcoal">Build Your Bowl</h2>
        <p className="text-gray-500 mt-1">Customize every layer</p>
      </div>

      <StepIndicator current={step} onJump={setStep} canJump={canJump} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {step !== "review" ? (
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-1">
                Choose Your {STEP_LABELS[step]}
              </h3>
              <IngredientPicker
                step={step}
                ingredients={ingredients[step] || []}
                selected={getSelected()}
                onToggle={handleToggle}
                multi={step !== "base" && step !== "sauce"}
              />
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={stepIdx === 0}
                  className="px-6 py-2.5 rounded-xl font-semibold transition-colors disabled:opacity-0 bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="px-6 py-2.5 rounded-xl font-semibold transition-colors disabled:opacity-40 bg-ocean hover:bg-ocean-light text-white"
                >
                  {stepIdx < STEP_ORDER.length - 2 ? "Next →" : "Review →"}
                </button>
              </div>
            </div>
          ) : (
            <ReviewStep bowl={bowl} extras={extras} onConfirm={handleConfirm} loading={loading} />
          )}
        </div>

        <div className="w-full lg:w-72 shrink-0">
          <OrderSummary bowl={bowl} extras={extras} />
        </div>
      </div>
    </div>
  );
}
