const router = require('express').Router();
const { User, Merchandise, Posting } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        const auctionData = await Posting.findAll({
            include: [
                {
                    model: User,
                    as: 'bidder',
                    attributes: ['username']
                },
                {
                    model: User,
                    as: 'poster',
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
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/posting/:id', withAuth, async (req, res) => {
        try {
            const postingData = await Posting.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        as: 'bidder',
                        attributes: ['username']
                    },
                    {
                        model: User,
                        as: 'poster',
                        attributes: ['username']
                        
                    },
                    {
                        model: Merchandise,
                        attributes: ['name']
                    }
                ],
            });
            const posting = postingData.get({ plain: true})
            console.log(posting)
            res.render('viewitem', {
                posting,
                logged_in: req.session.logged_in 
            });
        } catch (err) {
            res.status(500).json(err);
        }
});

router.get('/addpost', withAuth, async (req, res) => {
    try {
        const merchData = await Merchandise.findAll()
        const items = merchData.map((item) => item.get({ plain: true }));
        console.log(items);
        res.render('newpost', {
            items,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/profile', withAuth, async (req, res) => {
    try {
        const postingData = await Posting.findAll({
            where: {
                user_id : req.session.user_id
            },
            include: [
                {
                    model: User,
                    as: 'poster',
                    attributes: ['username']
                },
                {
                    model: Merchandise,
                    attributes: ['name']
                }
            ],
        });
        const postings = postingData.map((post) => post.get({ plain: true }));
        res.render('profile', {
            postings,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;
