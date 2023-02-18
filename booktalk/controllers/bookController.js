const router = require('express').Router();

router.get('/catalog', async (req, res) => {
    // const crypto = await cryptoService.getAll();
    const books = []

    res.render('books/catalog', { books });
});

module.exports = router;