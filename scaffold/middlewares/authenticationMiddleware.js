const jwt = require('../lib/jsonwebtoken');


exports.authentication = async (req, res, next) => {
    const ttoken = req.cookies['auth'];

    if (token) {
        const decodedToken = await jwt.verify(token);
    }

    next();
}