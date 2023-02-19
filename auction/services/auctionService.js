const Auction = require('../models/Auction');

exports.getAll = () => Auction.find({}).lean();

exports.getOwn = (userId) => Auction.find({
            author: {$eq: userId}, 
        });

exports.getOne = (auctionId) => Auction.findById(auctionId).lean();

exports.bid = async (userId, auctionId, newPrice) => {
    const auction = await Auction.findById(auctionId);

    if (auction.price > newPrice) {
        throw new Error('Bid must be higher than current price!')
    } 

    auction.bidders = userId;
    auction.price = newPrice;
    return auction.save();

};

exports.create = (author, bookData) => Auction.create({ ...bookData, author });

exports.edit = (auctionId, auctionData) => Auction.findByIdAndUpdate(auctionId, auctionData, { runValidators: true });

exports.close = (auctionId) => async (auctionId) => {
    const auction = await Auction.findById(auctionId);

    if (auction.closed) {
        throw new Error('Auction is already closed!')
    } 

    auction.closed = true;

    return auction.save();

};

exports.delete = (auctionId) => Auction.findByIdAndDelete(auctionId);