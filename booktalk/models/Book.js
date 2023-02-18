const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 2,
        required: true,
    },
    author: {
        type: String,
        minLength: 5,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /^http?s:\/\//,
    },
    bookReview: {
        type: String,
        minLength: 10,
        required: true,
    },
    genre: {
        type: String,
        minLength: 3,
        required: true,
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    wishlist: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;