const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');

router.use(homeController);
router.use(authController);
router.use(bookController);
router.all('*', (req, res) => {
    res.render('home/404');
});

module.exports = router;