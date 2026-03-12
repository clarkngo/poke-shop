import type { OrderResponse } from "../types";

interface Props {
  order: OrderResponse;
  onNewOrder: () => void;
}

export default function OrderConfirmation({ order, onNewOrder }: Props) {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="text-7xl mb-6">🎊</div>
      <h2 className="text-3xl font-bold text-charcoal mb-2">Order Confirmed!</h2>
      <p className="text-gray-500 mb-8">Your poke bowl is being prepared</p>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-left space-y-3 mb-8">
        <div className="flex justify-between">
          <span className="text-gray-500">Order ID</span>
          <span className="font-mono text-sm text-charcoal">{order.id.slice(0, 8)}...</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Items</span>
          <span className="font-medium text-charcoal">{order.items} bowl{order.items > 1 ? "s" : ""}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total</span>
          <span className="font-bold text-lg text-coral">${order.total_price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span className="bg-sunset/30 text-yellow-700 text-sm font-semibold px-3 py-0.5 rounded-full">
            {order.status}
          </span>
        </div>
      </div>

      <button
        onClick={onNewOrder}
        className="px-8 py-3 bg-ocean hover:bg-ocean-light text-white font-semibold rounded-xl transition-colors"
      >
        Start New Order
      </button>
    </div>
  );
}
