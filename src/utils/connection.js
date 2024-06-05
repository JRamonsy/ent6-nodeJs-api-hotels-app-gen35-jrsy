const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false }) //{logging: false} evita los console.log en la consola

module.exports = sequelize;