const Auction = require('../models/Auction');

exports.create = (author, bookData) => Auction.create({ ...bookData, author });
