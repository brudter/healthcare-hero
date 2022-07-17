const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class Services extends Model {
  // set up method to run on instance data (per user) to check password
}

// create fields/columns for User model
Services.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isDecimal: true
        }
    },
    provider_name: {
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
    modelName: 'services'
  }
);

module.exports = Services;