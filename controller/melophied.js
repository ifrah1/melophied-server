import userQueries from '../DB/queries/user-queries.js';
import jwtFunctions from '../auth/jwt.js';
import encrypt from '../auth/encrypt.js';
import db from '../models/index.js';

const { User, FanPage } = db;
//import user queries functions
const { verifyUser, usernameEmailExist, updateUser, verifyUsername } = userQueries;
//import jwt functions
const { createToken } = jwtFunctions;
// import encrypt functions
const { hashPassword } = encrypt;


const exploreData = async (req, res) => {
    try {
        // need to send top five fan pages

        // send all fan pages based on created date desc order 
        const allPages = await FanPage.find().sort('-createdAt').select('pageTitle artist author');

        return res.status(200).json({
            status: 200,
            message: 'Success',
            allPages
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });
    }
}

const melophiedCtrls = {
    exploreData,
}

export default melophiedCtrls;