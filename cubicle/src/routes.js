const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');

// Explicitly
// const express = require('express');
// const Router = express.Router;
// const router = Router();

router.get('/', homeController.getHomePage);

router.get('/about', homeController.getAboutPage);

// router.get('/create', (req, res) => {
//     res.render('create');
// })
router.get('/create', cubeController.getCreateCube);

router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;