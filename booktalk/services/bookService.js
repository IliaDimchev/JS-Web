const Book = require('../models/Book');

exports.getAll = () => Book.find({}).lean();

exports.getOne = (bookId) => Book.findById(bookId).lean();

exports.create = (ownerId, bookData) => Book.create({ ...bookData, owner: ownerId });
