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
    res.render('homepage', {
      auctions,
    //   logged_in: req.session.logged_in
    })
  } catch (error) {
  res.status(500).json(error);
  }
});

router.get('/posting/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {

    try {
      const merchandiseData = await Merchandise.findByPk(req.params.id, {
      include: [
        {
          model: Posting,
          attributes: [
            'current_bid',
            'acceptable_trades',
          ],
        },
      ],
      });
      const merchandise = merchandiseData.get({ plain: true });

      res.render('posting', { posting, loggedIn: req.session.loggedIn});
    }  catch (err) {
      res.status(500).json(err);
    }
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
