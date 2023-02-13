const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.findByUsername = () => User.findOne(username);

exports.register = async (username, email, password, rePass) => {
    if (password !== rePass) {
        throw new Error('Password mismatch!');
    }

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
        throw new Error('User exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword })
}
