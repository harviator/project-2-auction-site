const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postingRoutes = require('./postingRoutes');

router.use('/users', userRoutes);
router.use('/postings', postingRoutes);

module.exports = router;
