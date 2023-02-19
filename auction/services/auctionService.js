const Auction = require('../models/Auction');

exports.getAll = () => Auction.find({}).lean();

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

exports.edit = (auctionId, auctionData) => Auction.findByIdAndUpdate(auctionId, auctionData, { runValidators: true });


exports.create = (author, bookData) => Auction.create({ ...bookData, author });
