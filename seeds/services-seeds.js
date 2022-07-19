service, price, provider_id, category_id
const { Services } = require('../models');

const servicesData = [
  {
    service: 'Denver Health',
    price: 'denver@denver.com',
    provider_id: 'UofD', 
    category_id: '777 Bannock St',
  },
  {
    service: 'Denver Health',
    price: 'denver@denver.com',
    provider_id: 'UofD', 
    category_id: '777 Bannock St',
  }
]
const seedServicesData = () => Services.bulkCreate(servicesData);

module.exports = seedServicesData;
