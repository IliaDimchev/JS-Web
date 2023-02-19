const Auction = require('../models/Auction');

exports.getAll = () => Auction.find({}).lean();


exports.create = (author, bookData) => Auction.create({ ...bookData, author });
