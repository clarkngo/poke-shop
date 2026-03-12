import type { BowlBuild } from "../types";
import { BASE_PRICE } from "../types";

interface Props {
  bowl: Partial<BowlBuild>;
  extras: number;
}

export default function OrderSummary({ bowl, extras }: Props) {
  const total = BASE_PRICE + extras;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sticky top-6">
      <h3 className="font-bold text-ocean text-lg mb-4 flex items-center gap-2">
        🥣 Your Bowl
      </h3>

      <div className="space-y-3 text-sm">
        <SummaryRow label="Base" value={bowl.base} />
        <SummaryRow label="Protein" value={bowl.proteins?.join(", ")} />
        <SummaryRow label="Mix-ins" value={bowl.mixins?.length ? bowl.mixins.join(", ") : undefined} />
        <SummaryRow label="Sauce" value={bowl.sauce} />
        <SummaryRow label="Toppings" value={bowl.toppings?.length ? bowl.toppings.join(", ") : undefined} />
      </div>

      <div className="border-t border-gray-100 mt-4 pt-4">
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
        <div className="flex justify-between font-bold text-lg text-charcoal mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={`font-medium ${value ? "text-charcoal" : "text-gray-300"}`}>
        {value || "—"}
      </span>
    </div>
  );
}
