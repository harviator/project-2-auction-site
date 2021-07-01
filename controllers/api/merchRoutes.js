const router = require('express').Router();
const { User, Merchandise, Posting } = require('../../models');

// ROUTE TO GET LIST OF ACCEPTABLE MERCH
router.get('/', async (req, res) => {
    try {
        const merchData = await Merchandise.findAll()
        const items = merchData.map((item) => item.get({ plain: true }));
        console.log(items);
        res.status(200).json(items)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
