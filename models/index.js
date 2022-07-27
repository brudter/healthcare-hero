const Provider = require('./Provider')
const Category = require('./Category')
const Services = require('./Services')
const Comment = require('./Comment');

Provider.hasMany(Services, {
    foreignKey: 'provider_id'
});

Services.belongsTo(Provider, {
    foreignKey: 'provider_id'
});

Category.hasMany(Services, {
    foreignKey: 'category_id'
});

Services.belongsTo(Category, {
    foreignKey: 'category_id'
});

Comment.belongsTo(Provider, {
    foreignKey: 'provider_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Services, {
    foreignKey: 'services_id',
    onDelete: 'SET NULL'
});

Provider.hasMany(Comment, {
    foreignKey: 'provider_id',
    onDelete: 'SET NULL'
});

Services.hasMany(Comment, {
    foreignKey: 'services_id'
});



module.exports = { Provider, Services, Category, Comment };