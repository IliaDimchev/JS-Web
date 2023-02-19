const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        required: [true, 'Username is required!'],
    },
    email: {
        type: String,
        minLength: 10,
        required: [true, 'Email is required!'],
    },
    password: {
        type: String,
        required: true,
    }
});

// Password validation through the Model
//     }}, {
//         virtuals: {
//             rePass: {
//                 set(value) {
//                     if (this.password !== value ) {
//                         throw new mongoose.Error('Password mismatch!');
//                     }
//                 }
//             }
//         }
//     }
// );

const User = mongoose.model('User', userSchema);

module.exports = User;

// Attaching Virtual property outside of the model
// userSchema.virtual('rePass').set 