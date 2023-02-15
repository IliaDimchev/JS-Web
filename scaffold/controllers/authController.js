const router = require('express').Router();

const authService = require('../services/authService');
const { isAuthorized } = require('../middlewares/authMiddleware');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.status(404).render('auth/login', { error: error.message });
    }

});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePass } = req.body;

    await authService.register(username, email, password, rePass);

    res.redirect('/');
});

router.get('/logout', isAuthorized, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;