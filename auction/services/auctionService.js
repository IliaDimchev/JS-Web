const Auction = require('../models/Auction');

exports.getAll = () => Auction.find({}).lean();

exports.getOne = (auctionId) => Auction.findById(auctionId).lean();


exports.create = (author, bookData) => Auction.create({ ...bookData, author });
