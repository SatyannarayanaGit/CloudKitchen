const sequelize = require('../config/database');
const User = require('./User');
const MenuItem = require('./MenuItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Define associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId', as: 'menuItem' });

module.exports = {
    sequelize,
    User,
    MenuItem,
    Order,
    OrderItem
};
