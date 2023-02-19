const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const photoService = require('../services/photoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const photos = await photoService.getAll().populate('owner');


    res.render('photo/catalog', { photos });
});

router.get('/catalog/:photoId/details', async (req, res) => {
    const photo = await photoService.getOne(req.params.photoId).populate('owner');

    const isOwner = photo.owner._id == req.user?._id;
    // const isBuyer = photo.buyers?.some(id => id == req.user?._id);
    const canComment = req.user._id != photo.owner._id
    photo.comments = [];
    res.render('photo/details', { photo, isOwner, canComment });
});

router.get('/catalog/:photoId/edit', isAuthorized, async (req, res) => {
    const photo = await photoService.getOne(req.params.photoId);

    res.render('photo/edit', { photo });
});

router.post('/catalog/:photoId/edit', isAuthorized, async (req, res) => {
    const photoData = req.body;

    await photoService.edit(req.params.photoId, photoData);

    res.redirect(`/catalog/${req.params.photoId}/details`);
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