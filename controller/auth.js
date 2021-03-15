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
        // console.log('[Auth.js.login]', exist);


        if (verifiedUser !== false) {

            const userJWT = createToken(verifiedUser);
            console.log('[Auth.js Line 24]', userJWT);

            return res.status(200).json({
                status: 200,
                message: 'Success',
                userJWT
            });
        }

    } catch (error) {
        //need a respond back for 'line 11'
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