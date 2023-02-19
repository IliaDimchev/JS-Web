const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        tyoe: String,
        required: true,
    },
    image: {
        tyoe: String,
        required: true,
    },
    age: {
        tyoe: Number,
        required: true,
    },
    description: {
        tyoe: String,
        required: true,
    },
    location: {
        tyoe: String,
        required: true,
    },
    commentList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;