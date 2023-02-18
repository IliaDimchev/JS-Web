const router = require('express').Router();

const { isAuthorized } = require('../middlewares/authMiddleware');

const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    // const crypto = await cryptoService.getAll();
    const books = []

    res.render('books/catalog', { books });
});

router.get('/create', isAuthorized, (req, res) => {
    res.render('books/create');
});

router.post('/create', isAuthorized, async (req, res) => {
    const bookData = req.body;

    try {
        await bookService.create(req.user._id, bookData);
    } catch (error) {
        return res.status(400).render('books/create', { error: getErrorMessage(error) });
    }

    res.redirect('/catalog');
});

module.exports = router;