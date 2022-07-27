//service, price, provider_id, category_id
const { Services } = require('../models');

const servicesData = [
  {
    id: 1,
    service_name: 'x-ray of upper body (chest)',
    service_category: 'Imaging',
    cost: 236,
    provider_id: 1, 
  },
  {
    id: 2,
    service_name: 'x-ray of upper body (chest)',
    service_category: 'Imaging',
    cost: 420,
    provider_id: 2, 
  },
  {
    id: 3,
    service_name: 'x-ray of lower body (knees)',
    service_category: 'Imaging',
    cost: 181,
    provider_id: 1, 
  },
  {
    id: 4,
    service_name: 'x-ray of lower body (knees)',
    service_category: 'Imaging',
    cost: 278,
    provider_id: 2, 
  },
  {
  id: 5,
  service_name: 'x-ray of limb (hand)',
  service_category: 'Imaging',
  cost: 243,
  provider_id: 1,
  },
  {
    id: 6,
    service_name: 'x-ray of limb',
    service_category: 'Imaging',
    cost: 374,
    provider_id: 2,
    },
  {
    id: 7,
    service_name: 'CT Scan',
    service_category: 'Imaging',
    cost: 2186,
    provider_id: 1, 
  },
  {
    id: 8,
    service_name: 'comprehensive metabolic panel',
    service_category: 'Laboratory',
    cost: 117,
    provider_id: 1, 
  },
  {
    id: 9,
    service_name: 'comprehensive metabolic panel',
    service_category: 'Laboratory',
    cost: 180,
    provider_id: 2, 
  }
]
const seedServicesData = () => Services.bulkCreate(servicesData);

module.exports = seedServicesData;
