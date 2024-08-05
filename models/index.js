require('dotenv').config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // or your database dialect
  logging: false, // disable logging; default: console.log
});

const Post = require('./Post');
const User = require('./User');

// Initialize models
const models = { Post, User };

// Establish relationships if necessary
Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

// Sync database
sequelize.sync();

module.exports = { sequelize, ...models };
