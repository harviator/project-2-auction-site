const router = require('express').Router();
const { Posting } = require('../../models');
// const withAuth = require('../../utils/auth');

// ROUTE TO MAKE NEW POSTINGS
router.post('/', async (req, res) => {
    try {
        const newPosting = await Posting.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPosting);
    } catch (err) {
        res.status(500).json(err)
    }
});

// ROUTE TO DELETE POSTINGS
router.delete('/:id', async (req, res) => {
    try {
        const postingData = await Posting.destroy({
            where: {
                id = req.params.id,
                user_id: req.session.user_id,
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
