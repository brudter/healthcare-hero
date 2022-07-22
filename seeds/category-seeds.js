const { Category } = require('../models');

const categoryData = [
  {
    id: 1,
    service_category: 'Imaging',
  },
  {
    id: 2,
    service_category: 'Laboratory',
  }
]
const seedCategoryData = () => Category.bulkCreate(categoryData);

module.exports = seedCategoryData;
