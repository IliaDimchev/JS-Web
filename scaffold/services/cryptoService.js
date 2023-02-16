const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find({}).lean();

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });