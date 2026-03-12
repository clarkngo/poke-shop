module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    base: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proteins: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    mixins: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    sauces: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    toppings: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    itemPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
  }, {
    tableName: 'order_items',
    timestamps: true,
  });

  return OrderItem;
};