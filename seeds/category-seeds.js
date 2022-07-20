const { Category } = require('../models');

const categoryData = [
  {
    service_category: 'Emergency',
  },
  {
    service_category: 'Ear, Nose, Throat',
  }
]
const seedCategoryData = () => Category.bulkCreate(categoryData);

module.exports = seedCategoryData;
