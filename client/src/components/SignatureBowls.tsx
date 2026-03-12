import type { SignatureBowl, BowlBuild } from "../types";

interface Props {
  bowls: SignatureBowl[];
  onAddToCart: (bowl: BowlBuild) => void;
}

export default function SignatureBowls({ bowls, onAddToCart }: Props) {
  const handleAdd = (bowl: SignatureBowl) => {
    onAddToCart({
      bowl_name: bowl.name,
      base: bowl.base,
      proteins: bowl.proteins,
      mixins: bowl.mixins,
      sauce: bowl.sauce,
      toppings: bowl.toppings,
      item_price: bowl.price,
    });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-charcoal">Signature Bowls</h2>
        <p className="text-gray-500 mt-2">Chef-curated bowls ready to go</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {bowls.map((bowl) => (
          <div
            key={bowl.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-3xl mr-2">{bowl.image}</span>
                <h3 className="inline text-lg font-bold text-charcoal">{bowl.name}</h3>
              </div>
              <span className="text-lg font-bold text-coral">${bowl.price.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{bowl.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[bowl.base, ...bowl.proteins, ...bowl.mixins, bowl.sauce, ...bowl.toppings].map((item, i) => (
                <span key={i} className="bg-seafoam/10 text-ocean text-xs px-2 py-1 rounded-full">
                  {item}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleAdd(bowl)}
              className="w-full py-2.5 bg-seafoam hover:bg-seafoam-dark text-white font-semibold rounded-xl transition-colors"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
