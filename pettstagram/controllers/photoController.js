const router = require('express').Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const photoService = require('../services/photoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const photos = await photoService.getAll();


    res.render('photo/catalog', { photos });
});

module.exports = router;