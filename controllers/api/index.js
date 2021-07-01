const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postingRoutes = require('./postingRoutes');
const merchRoutes = require('./merchRoutes')

router.use('/users', userRoutes);
router.use('/postings', postingRoutes);
router.use('/merch', merchRoutes)

module.exports = router;
