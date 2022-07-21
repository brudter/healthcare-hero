//service, price, provider_id, category_id
const { Services } = require('../models');

const servicesData = [
  {
    id: 1,
    service_name: 'surgery',
    provider_url: 'www.google.com',
    service_category: 1,
    cost: '15000',
    provider_id: '1', 
  },
  {
    id: 2,
    service_name: 'tonsil removal',
    provider_url: 'www.bing.com',
    service_category: 2,
    cost: '1500',
    provider_id: '2', 
  }
]
const seedServicesData = () => Services.bulkCreate(servicesData);

module.exports = seedServicesData;
