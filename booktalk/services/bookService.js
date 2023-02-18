const Book = require('../models/Book');

exports.create = (ownerId, bookData) => Book.create({ ...bookData, owner: ownerId });
