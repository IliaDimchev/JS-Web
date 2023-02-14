const jwt = require('../lib/jsonwebtoken');


exports.authentication = async (req, res, next) => {
    const ttoken = req.cookies['auth'];

    if (token) {
        try {
        const decodedToken = await jwt.verify(token);

        req.user = decodedToken;

        } catch (err) {
            res.clearCookie('auth');
            return res.status(401).render('home/4040');
        }
    }

    next();
}