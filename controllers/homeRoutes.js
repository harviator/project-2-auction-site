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

// router.get('/posting/:id', async (req, res) => {
//     // if (!req.session.loggedIn) {
//     //     res.redirect('/login');
//     // } else {
//         try {
//             const postingData = await Posting.findByPk(req.params.id, {
//                 include: [
//                     {
//                         model: User,
//                         attributes: ['username']
//                     },
//                     {
//                         model: Merchandise,
//                         attributes: ['name']
//                     }
//                 ],
//             });
//             const posting = postingData.get({ plain: true})
//             console.log(posting)
//             res.render('viewitem', {
//                 posting,
//                 // loggedIn: req.session.loggedIn 
//             });
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     // }
// });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
