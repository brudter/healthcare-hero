const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Category extends Model {
  // set up method to run on instance data (per user) to check password
}

// create fields/columns for User model
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category'
  }
);

module.exports = Category;