const router = require('express').Router();

const authService = require('../services/authService');
const { isAuthorized } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

// Error Response Handler
// const errorResponse = (template, error, status = 400) => {
//     return res.status(404).render('auth/login', { error: getErrorMessage(error) });
// }
// Attach to views with insite the catch
// return errorResponse(res, 'template/file', error, statuscode);

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) });
    }

});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePass } = req.body;
    try {
        const token = await authService.register(username, email, password, rePass);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) })
    }
});

router.get('/logout', isAuthorized, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;