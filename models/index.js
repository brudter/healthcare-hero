const Provider = require('./Provider');
const Services = require('./Services');
const Category = require('./Category');

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

module.exports = { Provider, Services, Category };