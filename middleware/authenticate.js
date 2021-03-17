import jwtFunctions from '../auth/jwt.js';

const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(['Authentic.js line 6'], req.headers);

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            console.log(['Authentic.js line 10'], token);

            const user = jwtFunctions.decodeUser(token);

            console.log(['Authentic.js line 13'], user);

            req.user = user;
            next();
        }
    } catch (error) {

        res.sendStatus(401);
    }
};


export default authenticateJWT;
