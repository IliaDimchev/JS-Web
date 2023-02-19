const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const photoService = require('../services/photoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const photos = await photoService.getAll().populate('owner');


    res.render('photo/catalog', { photos });
});

router.get('/create', isAuthorized, (req, res) => {
    res.render('photo/create');
});

router.post('/create', isAuthorized, async (req, res) => {
    const photoData = req.body;

    try {
        await photoService.create(req.user._id, photoData);
    } catch (error) {
        return res.status(400).render('photo/create', { error: getErrorMessage(error) });
    }

    res.redirect('/catalog');
});

module.exports = router;