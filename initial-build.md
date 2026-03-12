When building these, try to visualize the "Full Stack" flow:

Frontend (React/Vue): The "Face." It collects user input and displays data.

Backend (Node/Express): The "Brain." It validates the data and decides what to do with it.

Database (PostgreSQL/MongoDB): The "Memory." It stores the data permanently.

A **Poke Shop app** is a fantastic beginner project because it introduces you to a "Build Your Own" logic, which is slightly more complex than a standard list but still very manageable.

Instead of just adding an item to a cart, you have to manage a "wizard" or "stepper" flow where a user selects a base, then proteins, then toppings.

---

## The App Concept: "PokeFlow"

A digital ordering system where users can either pick "Signature Bowls" or "Build Their Own."

### 1. Key Features (The MVP)

* **The "Builder":** A multi-step form (Base → Protein → Toppings → Sauce).
* **Order Summary:** A live-updating sidebar showing the current build and total price.
* **Inventory Logic:** Items that are "Out of Stock" should be greyed out (teaches you conditional rendering).
* **Simple Checkout:** A mock payment page that just "confirms" the order and saves it to a database.

---

## 2. The Database Schema

This is where the real learning happens. You’ll need a way to store all those different ingredients.

### **The Tables/Collections**

| Table | Description | Example Data |
| --- | --- | --- |
| **Users** | Basic account info | `username`, `email`, `password_hash` |
| **Ingredients** | All possible choices | `name: "Ahi Tuna"`, `category: "Protein"`, `price_extra: 2.00` |
| **Orders** | The final receipt | `user_id`, `total_price`, `status: "Preparing"` |
| **OrderItems** | The specific bowl build | `order_id`, `base: "Sushi Rice"`, `proteins: ["Tuna", "Salmon"]` |

---

## 3. Real-World Menu Data

To make your app look professional, you can seed your database with these common ingredients:

* **Bases:** Sushi Rice, Brown Rice, Mixed Greens, Zucchini Noodles.
* **Proteins:** Ahi Tuna, Salmon, Spicy Tuna, Tofu, Boiled Shrimp.
* **Mix-ins:** Edamame, Diced Cucumber, Red Onion, Scallions.
* **Sauces:** Spicy Mayo, Ponzu, Shoyu (Soy Sauce), Wasabi Aioli.
* **Toppings:** Avocado (+$1.50), Seaweed Salad, Furikake, Crispy Onions, Masago.

