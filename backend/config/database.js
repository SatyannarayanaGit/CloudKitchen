const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URI || 'postgres://postgres:postgres@localhost:5432/cloud_kitchen', {
    dialect: 'postgres',
    logging: false, // set to console.log to see SQL queries
});

module.exports = sequelize;
