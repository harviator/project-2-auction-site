const router = require('express').Router();
const { User, Merchandise, Posting } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        const auctionData = await Posting.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Merchandise,
                    attributes: ['name']
                }
            ],
        });
        const auctions = auctionData.map((auction) => auction.get({ plain: true }));
        console.log(auctions)
        res.render('homepage', {
            auctions,
            //   logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
