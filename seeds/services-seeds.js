//service, price, provider_id, category_id
const { Services } = require('../models');

const servicesData = [
  {
    id: 1,
    service_name: 'x-ray of upper body (chest)',
    provider_url: 'www.google.com',
    service_category: '1',
    cost: '236',
    provider_id: '1', 
  },
  {
    id: 2,
    service_name: 'x-ray of upper body (chest)',
    provider_url: 'www.google.com',
    service_category: '1',
    cost: '420',
    provider_id: '2', 
  },
  {
    id: 3,
    service_name: 'x-ray of lower body (knees)',
    provider_url: 'www.google.com',
    service_category: '1',
    cost: '181',
    provider_id: '1', 
  },
  {
    id: 4,
    service_name: 'x-ray of lower body (knees)',
    provider_url: 'www.google.com',
    service_category: '1',
    cost: '278',
    provider_id: '2', 
  },
  {
  id: 5,
  service_name: 'x-ray of limb (hand)',
  provider_url: 'www.google.com',
  service_category: '1',
  cost: '243',
  provider_id: '1',
  },
  {
    id: 6,
    service_name: 'x-ray of limb',
    provider_url: 'www.google.com',
    service_category: '1',
    cost: '374',
    provider_id: '2',
    },
  {
    id: 7,
    service_name: 'CT Scan',
    provider_url: 'www.google.com',
    service_category: '1',
    cost: '2186',
    provider_id: '1', 
  },
  {
    id: 8,
    service_name: 'comprehensive metabolic panel',
    provider_url: 'www.bing.com',
    service_category: '2',
    cost: '117',
    provider_id: '1', 
  },
  {
    id: 9,
    service_name: 'comprehensive metabolic panel',
    provider_url: 'www.bing.com',
    service_category: '2',
    cost: '180',
    provider_id: '2', 
  }
]
const seedServicesData = () => Services.bulkCreate(servicesData);

module.exports = seedServicesData;
