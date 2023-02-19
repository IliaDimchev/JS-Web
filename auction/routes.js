const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const auctionController = require('./controllers/auctionController');

router.use(homeController);
router.use(authController);
router.use(auctionController);
router.all('*', (req, res) => {
    res.render('home/404');
});

module.exports = router;