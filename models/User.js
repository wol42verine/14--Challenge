const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Ensure this path is correct

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // Other fields as necessary
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'User',
  }
);

module.exports = User;
