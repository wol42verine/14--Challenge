const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Ensure this path is correct

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Ensure this matches the User model if it exists
        key: 'id',
      },
      allowNull:false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at', // Map to the database column name
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at', // Map to the database column name
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Post;
