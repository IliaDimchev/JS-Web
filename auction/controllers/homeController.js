const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
    // res.render('home/index'); Explicit way
})

module.exports = router;