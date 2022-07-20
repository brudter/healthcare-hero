const { Provider } = require('../models');

const providerData = [
  {
    username: 'Denver Health',
    email: 'denver@denver.com',
    password: 'UofD', 
    address: '777 Bannock St',
    address_city: 'Denver',
    address_state: 'Colorado',
    address_zip: '80204',
    specialization: 'Emergency Medical'
  },
  {
    username: 'Lenox Hill Hospital',
    email: 'LenoxHill@email.com',
    password: 'Lenox', 
    address: '100 E 77th St',
    address_city: 'New York',
    address_state: 'New York',
    address_zip: '10075',
    specialization: 'Ear, Nose, Throat'
  }
]
const seedProviderData = () => Provider.bulkCreate(providerData);

module.exports = seedProviderData;
