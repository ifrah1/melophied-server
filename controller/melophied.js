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


const exploreData = (req, res) => {
    return res.send('Test');
}

const getFanPage = async (req, res) => {

    try {
        //get user data minus the password
        let foundFanPage = await FanPage.findById(req.params.fanPageID);
      
        if(foundFanPage = null) {
            return res.status(204).json({
                status: 204,
                message: 'No Content',
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: 'Success',
                foundFanPage,
            });  
        }
        
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });
    }
}

const melophiedCtrls = {
    exploreData,
    getFanPage,
}

export default melophiedCtrls;