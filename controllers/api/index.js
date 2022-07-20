const router = require('express').Router();

const providerRoutes = require('./provider-routes.js');
const servicesRoutes = require('./services-routes');
const commentRoutes = require('./comment-routes');

router.use('/providers', providerRoutes);
router.use('/services', servicesRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
