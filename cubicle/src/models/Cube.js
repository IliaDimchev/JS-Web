const fs = require('fs');
const db = require('../db.json');
const path = require('path');

class Cube {
    constructor({name, description, imageUrl, difficultyLevel}) {
        this.name = name, 
        this.description = description, 
        this.imageUrl = imageUrl, 
        this.difficultyLevel = difficultyLevel
    }

    //Validations possible

    static save(cube) {
        this.id = db.cubes[db.cubes.length - 1].id + 1;
        // this.id = db.cubes.length; - might overlap IDs, if some are deleted
        db.cubes.push(cube);
        let json = JSON.stringify(db, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../db.json'), json);
    }
}

module.exports = Cube;