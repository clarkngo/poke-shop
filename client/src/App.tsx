import { useState, useEffect } from "react";
import { api } from "./api";
import type { IngredientsMap, SignatureBowl, BowlBuild, OrderResponse, User } from "./types";
import BowlBuilder from "./components/BowlBuilder";
import SignatureBowls from "./components/SignatureBowls";
import OrderConfirmation from "./components/OrderConfirmation";
import AuthModal from "./components/AuthModal";

type View = "menu" | "builder" | "confirmation";

function App() {
  const [view, setView] = useState<View>("menu");
  const [ingredients, setIngredients] = useState<IngredientsMap | null>(null);
  const [signatureBowls, setSignatureBowls] = useState<SignatureBowl[]>([]);
  const [cart, setCart] = useState<BowlBuild[]>([]);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getIngredients(), api.getSignatureBowls()])
      .then(([ing, sig]) => {
        setIngredients(ing);
        setSignatureBowls(sig);
      })
      .catch(() => setError("Failed to load menu. Is the server running?"));
  }, []);

  const handleAddToCart = (bowl: BowlBuild) => {
    setCart((prev) => [...prev, bowl]);
  };

  const handleBuilderComplete = async (bowl: BowlBuild) => {
    const items = [...cart, bowl];
    setLoading(true);
    try {
      const res = await api.placeOrder(items, user?.id);
      setOrder(res);
      setCart([]);
      setView("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickOrder = async (bowl: BowlBuild) => {
    setLoading(true);
    try {
      const res = await api.placeOrder([bowl], user?.id);
      setOrder(res);
      setCart([]);
      setView("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNewOrder = () => {
    setOrder(null);
    setCart([]);
    setView("menu");
  };

  if (error && !ingredients) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
          <div className="text-5xl mb-4">🔌</div>
          <h2 className="text-xl font-bold text-charcoal mb-2">Connection Error</h2>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-ocean text-white rounded-xl font-medium hover:bg-ocean-light transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!ingredients) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-bounce">🐟</div>
          <p className="text-gray-500 mt-4 font-medium">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={handleNewOrder} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🍣</span>
            <span className="text-xl font-bold text-ocean">PokeFlow</span>
          </button>

          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <span className="bg-coral text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {cart.length} in cart
              </span>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Hi, {user.username}</span>
                <button
                  onClick={() => setUser(null)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-sm font-medium text-ocean hover:text-ocean-light transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
            <button onClick={() => setError("")} className="ml-2 font-bold">✕</button>
          </div>
        )}

        {view === "menu" && (
          <div className="space-y-12">
            {/* Hero */}
            <section className="text-center py-8">
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-3">
                Build Your Perfect Bowl
              </h1>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                Fresh fish, crisp veggies, bold sauces — your way.
              </p>
              <button
                onClick={() => setView("builder")}
                className="mt-6 px-8 py-3.5 bg-coral hover:bg-coral-dark text-white font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Building 🥢
              </button>
            </section>

            {/* Signature Bowls */}
            <section>
              <SignatureBowls bowls={signatureBowls} onAddToCart={handleQuickOrder} />
            </section>
          </div>
        )}

        {view === "builder" && (
          <BowlBuilder
            ingredients={ingredients}
            onComplete={handleBuilderComplete}
            loading={loading}
          />
        )}

        {view === "confirmation" && order && (
          <OrderConfirmation order={order} onNewOrder={handleNewOrder} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-12 py-6 text-center text-sm text-gray-400">
        PokeFlow &copy; {new Date().getFullYear()} — Built with 🐟 and ❤️
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onAuth={(u) => { setUser(u); setShowAuth(false); }}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}

export default App;
