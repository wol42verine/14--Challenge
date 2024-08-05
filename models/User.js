const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at', // Maps to snake_case column name
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at', // Maps to snake_case column name
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Ensure timestamps are enabled
    underscored: true, // Use snake_case for columns
  }
);

module.exports = User;
