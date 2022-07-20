service, price, provider_id, category_id
const { Services } = require('../models');

const servicesData = [
  {
    service: 'surgery',
    price: '15000',
    provider_id: '1', 
    category_id: '1',
  },
  {
    service: 'tonsile removal',
    price: '1500',
    provider_id: '2', 
    category_id: '2',
  }
]
const seedServicesData = () => Services.bulkCreate(servicesData);

module.exports = seedServicesData;
