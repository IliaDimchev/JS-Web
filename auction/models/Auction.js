const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: {
            values: ['estate', 'vehicles', 'furniture', 'electronics', 'other'],
            message: 'Invalid category',
        },
        required: true,
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    bidders: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;