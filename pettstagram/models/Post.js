const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        minLength: 2,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});

const Post = mongoose.model('Post', photoSchema);

module.exports = Post;