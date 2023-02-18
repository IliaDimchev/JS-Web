const Book = require('../models/Book');

exports.getAll = () => Book.find({}).lean();

exports.create = (ownerId, bookData) => Book.create({ ...bookData, owner: ownerId });
