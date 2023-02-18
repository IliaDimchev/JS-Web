const Book = require('../models/Book');

exports.getAll = () => Book.find({}).lean();

exports.getOne = (bookId) => Book.findById(bookId).lean();

exports.getWishlist = async (userId) => {
    let books = await this.getAll();
    
    let wishlist = []
    for (book in books){
        if (books[book].wishlist.filter(x => x == userId).length > 0){
            wishlist.push(books[book]);
        }
    }

    return wishlist;
}

exports.wish = async (userId, bookId) => {
    const book = await Book.findById(bookId);

    book.wishlist.push(userId);

    return book.save();
};

exports.create = (ownerId, bookData) => Book.create({ ...bookData, owner: ownerId });

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData, { runValidators: true });

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);
