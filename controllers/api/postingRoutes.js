const router = require('express').Router();
const { Posting } = require('../../models');
// const withAuth = require('../../utils/auth');

// ROUTE TO GET SPECIFIC POSTINGS
router.get('/:id', async (req, res) => {
    // if (!req.session.loggedIn) {
    //     res.redirect('/login');
    // } else {
        try {
            const postingData = await Posting.findByPk(req.params.id, {
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
            const posting = postingData.get({ plain: true})
            console.log(posting)
            res.render('viewitem', {
                posting,
                // loggedIn: req.session.loggedIn
            });
        } catch (err) {
            res.status(500).json(err);
        }
    // }
});


// ROUTE TO MAKE NEW POSTINGS
router.post('/', async (req, res) => {
    try {
        const newPosting = await Posting.create({
            ...req.body,
            // user_id: req.session.user_id,
        });

        res.status(200).json(newPosting);
    } catch (err) {
        res.status(500).json(err)
    }
});

// ROUTE TO UPDATE POSTINGS
router.put('/:id', async (req, res) => {
    try {
        const postingData = await Posting.update(
            {
                current_bid: req.body.current_bid,
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        );

        if (!postingData) {
            res.status(404).json({ message: 'POSTING NOT FOUND' });
        } else {
            res.status(200).json({ message: 'POSTING UPDATED' })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// ROUTE TO DELETE POSTINGS
router.delete('/:id', async (req, res) => {
    try {
        const postingData = await Posting.destroy({
            where: {
                id : req.params.id,
                // user_id: req.session.user_id,
            },
        });

        // IF POSTING NOT FOUND
        if (!postingData) {
            res.status(404).json({ message: "NO POSTING FOUND" });
            return
        } else {
            res.status(200).json(postingData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
