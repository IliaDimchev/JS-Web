const Photo = require('../models/Photo');

exports.getAll = () => Photo.find({}).lean();

exports.getOne = (photoId) => Photo.findById(photoId).lean();


exports.create = (ownerId, photoData) => Photo.create({ ...photoData, owner: ownerId });

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData, { runValidators: true });
