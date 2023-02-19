const mongoose = require('mongoose');
function getFirstMongooseError(error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message);
    
    return errors[0];
}

exports.getErrorMessage = (error) => {

    if (error instanceof mongoose.Error){
        return getFirstMongooseError(error);
    }

    // if (error instanceof mongoose.Error){
    //     return error.message;
    // }

    return error.message;
}