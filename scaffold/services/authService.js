const User = require('../models/User');

exports.register = (username, email, password, rePass) =>
 User.create({ username, email, password, rePass })