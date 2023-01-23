const router = require('express').Router();

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');

// Explicitly
// const express = require('express');
// const Router = express.Router;
// const router = Router();

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);
router.get('404', homeController.getErrorPage);

// router.get('/create', (req, res) => {
//     res.render('create');
// })
router.get('/create', cubeController.getCreateCube);
router.post('/create', cubeController.postCreateCube);
router.get('/details/:cubeId', cubeController.getCubeDetails);

router.get('*', homeController.getErrorPage);

module.exports = router;