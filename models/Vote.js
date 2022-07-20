const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model { }

Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        provider_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'provider',
                key: 'id'
            }
        },
        services_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'services',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;
