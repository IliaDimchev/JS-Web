const mongoose = require('mongoose');

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
        // match: /^https?:\/\//, - regex validation
        validate: {
            validator: function(value) {
                return value.startsWith('http://') || value.startsWith('https://')
            },
            message: 'URL is invalid'
        }
    },
    difficultyLevel: {
        type: Number,
        mxa: 6,
        min: 1,
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }]
});

// Setting validations from outside the Schema
// cubeSchema.path('imageUrl').validate() = () => {validator:..}

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
