const Photo = require('../models/Photo');

exports.getAll = () => Photo.find({}).lean();