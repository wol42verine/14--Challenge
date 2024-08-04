const { Sequelize } = require('sequelize');
require('dotenv').config();  // Ensure dotenv is loaded to access environment variables

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  define: {
    // Custom naming conventions for timestamps
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

console.log('DATABASE_URL:', process.env.DATABASE_URL);

module.exports = sequelize;
