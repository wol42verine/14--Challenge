const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
        model: 'User',
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
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

// Define associations
const User = require('./User');
const Comment = require('./Comment');

Post.hasMany(Comment, {
  foreignKey: 'postId',
  as: 'comments', // Use this alias
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Post, {
  foreignKey: 'userId',
});


module.exports = Post;