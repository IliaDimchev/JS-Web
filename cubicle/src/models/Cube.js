const { mongoose, model } = require('mongoose');

// Short-Way 
// const { Schema } = require('mongoose');
// const cubeSchema = new Schema;

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        // Add Http/https validation
    },
    difficultyLevel: {
        type: Number,
        mxa: 6,
        min: 1,
    }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;
