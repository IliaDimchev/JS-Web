const router = require('express').Router();

const { isAuthorized } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll();


    res.render('crypto/catalog', { crypto });
});

router.get('/:cryptoId/details', async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const isOwner = crypto.owner.toString() === req.user?._id

    res.render('crypto/details', { crypto, isOwner });
});

router.get('/:cryptoId/byt', isAuthorized, async (req, res) => {
    await cryptoService.buy(req.user._id, req.params.cryptoId);


});

router.get('/create', isAuthorized, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuthorized, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoService.create(req.user._id, cryptoData);
    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }

    res.redirect('/crypto/catalog');
});

module.exports = router;