const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalAmount: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    status: { 
        type: DataTypes.ENUM('pending', 'processing', 'out-for-delivery', 'delivered', 'cancelled'), 
        defaultValue: 'pending' 
    },
    address: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
}, {
    timestamps: true,
});

module.exports = Order;
