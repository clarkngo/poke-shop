const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'sqlite:./poke_shop.db',
  {
    dialect: process.env.DATABASE_URL ? 'postgres' : 'sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  }
);

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Ingredient = require('./Ingredient')(sequelize, Sequelize.DataTypes);
const Order = require('./Order')(sequelize, Sequelize.DataTypes);
const OrderItem = require('./OrderItem')(sequelize, Sequelize.DataTypes);

// Define associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

const db = {
  sequelize,
  Sequelize,
  User,
  Ingredient,
  Order,
  OrderItem,
};

module.exports = db;