const router = require('express').Router();

const { isAuthorized } = require('../middlewares/authMiddleware');

const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const books = await bookService.getAll();

    res.render('books/catalog', { books });
});

router.get('/catalog/:bookId/details', async (req, res) => {
    const book = await bookService.getOne(req.params.bookId);

    const isOwner = book.owner.toString() === req.user?._id;
    const isReader = book.wishlist?.some(id => id == req.user?._id);
    
    res.render('books/details', { book, isOwner, isReader });
});

router.get('/catalog/:bookId/wish', isAuthorized, async (req, res) => {
    try {
        await bookService.wish(req.user._id, req.params.bookId);
    } catch (error) {
        return res.status(404).render('/home/404', { error: getErrorMessage(error) });
    }


    res.redirect(`/catalog/${req.params.bookId}/details`);
});

router.get('/catalog/:bookId/delete', isAuthorized, async (req, res) => {
    await bookService.delete(req.params.bookId);

    res.redirect('/catalog');
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