const Book = require('../models/Book');

exports.getAll = () => Book.find({}).lean();

exports.getOne = (bookId) => Book.findById(bookId).lean();

exports.wish = async (userId, bookId) => {
    const book = await Book.findById(bookId);

    book.wishlist.push(userId);

    return book.save();
};

exports.create = (ownerId, bookData) => Book.create({ ...bookData, owner: ownerId });
