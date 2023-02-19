const Photo = require('../models/Photo');

exports.getAll = () => Photo.find({}).lean();

exports.getOne = (photoId) => Photo.findById(photoId).lean();

exports.comment = async (userId, comment, photoId) => {
    const photo = await Photo.findById(photoId);
    photo.commentList.push(userId, comment);

    return photo.save();
};

exports.getOnePhoto = (photoId) => Photo.findById(photoId).populate('owner').populate('commentList.userId').lean(); 

exports.commentPhoto = (photoId, userId, comment) => Photo.findByIdAndUpdate(photoId, {$push: {commentList: {userId, comment}}});

exports.create = (ownerId, photoData) => Photo.create({ ...photoData, owner: ownerId });

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData, { runValidators: true });

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);