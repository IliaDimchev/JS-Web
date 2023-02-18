const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    // const crypto = await cryptoService.getAll();
    const books = []

    res.render('books/catalog', { books });
});

router.get('/create', isAuthorized, (req, res) => {
    res.render('books/create');
});

module.exports = router;