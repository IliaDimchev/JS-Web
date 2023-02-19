const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    email: {
        type: String,
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