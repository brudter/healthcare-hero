//service, price, provider_id, category_id
const { Services } = require('../models');

const servicesData = [
  {
    services: 'surgery',
    services_url: 'www.google.com',
    service_type: 'type of service',
    cost: '15000',
    provider_id: '1', 
    address: '876 park ave'
  },
  {
    services: 'tonsile removal',
    services_url: 'www.bing.com',
    service_type: 'type of service',
    cost: '1500',
    provider_id: '2', 
    address: '876 park ave'
  }
]
const seedServicesData = () => Services.bulkCreate(servicesData);

module.exports = seedServicesData;
