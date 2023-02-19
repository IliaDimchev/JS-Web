const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const { getCategoryViewData } = require('../utils/viewDataUtils');
const auctionService = require('../services/auctionService');
const { getErrorMessage } = require('../utils/errorUtils');
const { categoryMap } = require('../constants');

router.get('/catalog', async (req, res) => {
    const auctions = await auctionService.getAll();


    res.render('auction/catalog', { auctions });
});

router.get('/catalog/:auctionId/details', async (req, res) => {
    const auction = await auctionService.getOne(req.params.auctionId).populate('author').populate('bidders');
    const authorName = `${auction.author.firstName} ${auction.author.lastName}`
    const isAuthor = auction.author._id.toString() === req.user?._id;
    const isBidder = auction.bidders == req.user?._id
    const bidders = auction.bidders
    const highestBidder = `${auction.bidders.firstName} ${auction.bidders.lastName}`
    console.log(auction)

    auction.category = categoryMap[auction.category];

    res.render('auction/details', { auction, isAuthor, isBidder, authorName, bidders, highestBidder });
});

router.post('/catalog/:auctionId', isAuthorized, async (req, res) => {
    const auction = await auctionService.getOne(req.params.auctionId).populate('author');
    const newPrice = req.body.price
    const authorName = `${auction.author.firstName} ${auction.author.lastName}`
    const isAuthor = auction.author._id.toString() === req.user?._id;
    const isBidder = auction.bidders == req.user?._id
    const bidders = auction.bidders

    auction.category = categoryMap[auction.category];

    try {
        await auctionService.bid(req.user._id, req.params.auctionId, newPrice);
    } catch (error) {
        return res.status(400).render('auction/details', { auction, isAuthor, isBidder, authorName, bidders, error: getErrorMessage(error) });
    }


    res.redirect(`/catalog/${req.params.auctionId}/details`);
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