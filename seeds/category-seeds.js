const { Category } = require('../models');

const categoryData = [
  {
    id: 1,
    service_category: 'Emergency',
  },
  {
    id: 2,
    service_category: 'Ear, Nose, Throat',
  }
]
const seedCategoryData = () => Category.bulkCreate(categoryData);

module.exports = seedCategoryData;
