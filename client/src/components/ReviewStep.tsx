import type { BowlBuild } from "../types";
import { BASE_PRICE } from "../types";

interface Props {
  bowl: Partial<BowlBuild>;
  extras: number;
  onConfirm: () => void;
  loading: boolean;
}

export default function ReviewStep({ bowl, extras, onConfirm, loading }: Props) {
  const total = BASE_PRICE + extras;

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-charcoal">Looks delicious!</h2>
        <p className="text-gray-500 mt-1">Review your bowl before ordering</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
        <ReviewLine emoji="🍚" label="Base" value={bowl.base || "—"} />
        <ReviewLine emoji="🐟" label="Protein" value={bowl.proteins?.join(", ") || "—"} />
        <ReviewLine emoji="🥒" label="Mix-ins" value={bowl.mixins?.join(", ") || "None"} />
        <ReviewLine emoji="🥫" label="Sauce" value={bowl.sauce || "None"} />
        <ReviewLine emoji="🥑" label="Toppings" value={bowl.toppings?.join(", ") || "None"} />

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Base price</span>
            <span>${BASE_PRICE.toFixed(2)}</span>
          </div>
          {extras > 0 && (
            <div className="flex justify-between text-sm text-coral mt-1">
              <span>Extras</span>
              <span>+${extras.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-xl text-charcoal mt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={loading}
        className="w-full mt-6 py-4 bg-coral hover:bg-coral-dark text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {loading ? "Placing Order..." : `Place Order — $${total.toFixed(2)}`}
      </button>
    </div>
  );
}

function ReviewLine({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{emoji}</span>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
        <div className="font-medium text-charcoal">{value}</div>
      </div>
    </div>
  );
}
