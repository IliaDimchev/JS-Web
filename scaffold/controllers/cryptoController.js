const router = require('express').Router();

const { isAuthorized } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll();

    
    res.render('crypto/catalog', {crypto});
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