const mongoose = require('mongoose');

initDatabase().catch(err => console.log(err));

async function initDatabase() {
    mongoose.set('strictQuery', false);

    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    console.log('DB Connected')
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    const cubicleSchema = new mongoose.Schema({
        name: String,
        // description: String,
        // imageUrl: String,
        // difficultyLevel: Number,
    })

    const Cubicle = mongoose.model('Cubicle', cubicleSchema)
}

module.exports = { initDatabase };