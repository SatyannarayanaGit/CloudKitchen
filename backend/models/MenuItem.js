const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MenuItem = sequelize.define('MenuItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    price: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    category: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    image: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    isAvailable: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    },
}, {
    timestamps: true,
});

module.exports = MenuItem;
