import jwtFunctions from '../auth/jwt.js';

const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const user = jwtFunctions.decodeUser(token);

            req.user = user;
            next();
        }
    } catch (error) {
        res.sendStatus(401);
    }
};


export default authenticateJWT;
