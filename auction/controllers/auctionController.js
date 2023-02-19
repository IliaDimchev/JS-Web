const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const { getCategoryViewData } = require('../utils/viewDataUtils');
const auctionService = require('../services/auctionService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const auctions = await auctionService.getAll();


    res.render('auction/catalog', { auctions });
});

router.get('/create', isAuthorized, (req, res) => {
    res.render('auction/create');
});

router.post('/create', isAuthorized, async (req, res) => {
    const auctionData = req.body;

    try {
        await auctionService.create(req.user._id, auctionData);
    } catch (error) {
        return res.status(400).render('auction/create', { error: getErrorMessage(error) });
    }

    res.redirect('/catalog');
});

module.exports = router;