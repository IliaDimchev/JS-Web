const mongoose = require('mongoose');

const config = require('./index');

async function initDatabase() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.DB_URI);

    console.log('DB Connected');
}

module.exports = initDatabase;
