const Cube = require('../models/Cube');
const db = require('../db.json');

exports.getCreateCube = (req, res) => {
    res.render('create');
};

exports.postCreateCube = async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = new Cube({ name, description, imageUrl, difficultyLevel })

    await cube.save();

    res.redirect('/');
};

exports.getCubeDetails = (req, res) => {
    let cubeId = req.params.cubeId;

    if (!cubeId){
        return res.redirect('404');
    }

    let cube = Cube.find(x => x._id === cubeId);

    if (!cube) {
        return res.redirect('404');
    }

    res.render('details', { cube });
}
