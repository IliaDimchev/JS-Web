const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);