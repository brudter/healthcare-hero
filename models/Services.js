const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Services extends Model {}
//     static upvote(body, models) {
//         return models.Vote.create({
//             user_id: body.services_id,
//             services_id: body.services_id
//         }).then(() => {
//             return Services.findOne({
//                 where: {
//                     id: body.services_id
//                 },
//                 attributes: [
//                     'id',
//                     'services_url',
//                     'services',
//                     'address',
//                     'service_type',
//                     'cost',
//                     'created_at',
//                     [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE services.id = vote.services_id)'), 'vote_count']
//                 ],
//                 include: [
//                     {
//                         model: models.Comment,
//                         attributes: ['id', 'comment_text', 'services_id', 'user_id', 'created_at'],
//                         include: {
//                             model: models.User,
//                             attributes: ['username']
//                         }
//                     }
//                 ]
//             });
//         });
//     }
// }

// create fields/columns for Post model
Services.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        service_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provider_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        service_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isDecimal: true,
            }
        },
        provider_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'provider',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'services'
    }
);

module.exports = Services;
