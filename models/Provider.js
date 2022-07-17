const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class Provider extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
Provider.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
    },
    address_city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
    },
    address_state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2]
        }
    },
    address_zip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [5]
        }
      },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newProviderData) {
        newProviderData.password = await bcrypt.hash(newProviderData.password, 10);
        return newProviderData;
      },

      async beforeUpdate(updatedProviderData) {
        updatedProviderData.password = await bcrypt.hash(updatedProviderData.password, 10);
        return updatedProviderData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'provider'
  }
);

module.exports = Provider;
