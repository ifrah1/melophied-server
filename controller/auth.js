import userQueries from '../DB/queries/user-queries.js';
import jwtFunctions from '../auth/jwt.js';

const { createToken } = jwtFunctions;

const login = async (req, res) => {
    try {
        // grab data from body
        const { username, password } = req.body;

        // check if credentials are empty 
        if (!username || !password) throw 'Invalid Credentials';

        // Verify if user credentials matches 
        const verifiedUser = await userQueries.verifyUser(username, password)

        if (verifiedUser !== false) {
            // create the json web token 
            const userJWT = createToken(verifiedUser);
            console.log('[Auth.js Line 24]', userJWT);

            return res.status(200).json({
                status: 200,
                message: 'Success',
                userJWT
            });
        } else {
            throw 'Invalid Credentials';
        }

    } catch (error) {
        // if invalid credentials then let user know
        if (error === 'Invalid Credentials') {
            return res.status(401).json({
                status: 401,
                message: 'Invalid Credentials',
            });

        }

        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });
    }
};


const authCtrls = {
    login
}

export default authCtrls;