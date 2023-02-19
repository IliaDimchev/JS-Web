const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /^http?s:\/\//,
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
        required: true,
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
    },
    location: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
    },
    commentList: [{
        userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
        },
        comment: {
            type: String
        }
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;