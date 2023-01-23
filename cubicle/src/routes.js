const cubeController = require('./controllers/cubeController');
const router = require('express').Router();

// Explicitly
// const express = require('express');
// const Router = express.Router;
// const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
})

// router.get('/create', (req, res) => {
//     res.render('create');
// })
router.get('/create', cubeController.getCreateCube)

router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;