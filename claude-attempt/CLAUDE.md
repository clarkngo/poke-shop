# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PokeFlow is a full-stack digital ordering system for poke bowls. The application allows users to build custom poke bowls through a multi-step wizard interface, manage orders, and handle authentication.

## Architecture

**Frontend (React + TypeScript + Vite)**
- `src/components/` - React components (PokebowlBuilder, OrderSummary, Auth)
- `src/context/` - React context providers (AuthContext)
- `src/services/` - API integration layer
- `src/types/` - TypeScript type definitions

**Backend (Node.js + Express + Sequelize)**
- `server/index.js` - Main Express server
- `server/models/` - Database models (User, Ingredient, Order, OrderItem)
- `server/routes/` - API endpoints (auth, ingredients, orders)
- `server/seedData.js` - Database seeding script

**Database Schema**
- Users: username, email, passwordHash
- Ingredients: name, category (base/protein/mixins/sauce/topping), priceExtra, inStock
- Orders: userId, totalPrice, status, customerNotes
- OrderItems: orderId, base, proteins, mixins, sauces, toppings, quantity, itemPrice

## Development Commands

**Setup and Installation:**
```bash
npm install                    # Install all dependencies
npm run seed                  # Initialize database with ingredient data
```

**Development:**
```bash
npm run dev                   # Start both frontend and backend concurrently
npm run server               # Start backend only (port 5000)
npm run frontend             # Start frontend only (port 5173)
```

**Build and Deploy:**
```bash
npm run build               # Build frontend for production
npm run preview             # Preview production build
```

## Key Features

1. **Multi-Step Bowl Builder**: Base → Protein → Mix-ins → Sauce → Toppings
2. **Real-time Price Calculation**: Updates as ingredients are selected
3. **Inventory Management**: Out-of-stock items are disabled
4. **Order Summary**: Live cart with item management
5. **Authentication**: JWT-based user registration/login
6. **Responsive Design**: Mobile-friendly interface

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/ingredients` - Get all ingredients grouped by category
- `GET /api/ingredients/:category` - Get ingredients by category
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)

## Environment Setup

Create `.env` file (see `.env.example`):
```
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-key
DATABASE_URL=sqlite:./poke_shop.db
```