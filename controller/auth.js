// import jwtFunctions from '../auth/jwt.js';
// /* all models */
// import db from '../models/index.js';
// const { User } = db;

import userQueries from '../DB/queries/user-queries.js';


const login = async (req, res) => {
    // console.log(req.body)

    try {
        // grab data from body
        const { username, email, password } = req.body;

        const exist = await userQueries.verifyUser(username, password)
        console.log('[Auth.js.login]', exist);

        // check if credentials are empty 
        if (!username || !password) throw 'Invalid Credentials';

        return res.status(200).json({
            status: 200,
            message: 'Success',
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error,
        });

    }
};


const authCtrls = {
    login
}

export default authCtrls;