//service, price, provider_id, category_id
const { Services } = require('../models');

const servicesData = [
  {
    services: 'surgery',
    provider_url: 'www.google.com',
    service_type: 'emergency',
    cost: '15000',
    provider_id: '1', 
  },
  {
    services: 'tonsil removal',
    provider_url: 'www.bing.com',
    service_type: 'ear, nose, throat',
    cost: '1500',
    provider_id: '2', 
  }
]
const seedServicesData = () => Services.bulkCreate(servicesData);

module.exports = seedServicesData;
