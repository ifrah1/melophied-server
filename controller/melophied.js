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
        let foundFanPage = await FanPage.findById(req.params.fanPageID).lean(); // lean allows us to add extra key values
      
        if(foundFanPage === null) throw "noFanPageContent";

        const authorUsername = await User.findById(foundFanPage.author).select("username");

        if(!authorUsername) throw "noAuthor";
        foundFanPage.username = authorUsername.username;
            
        return res.status(200).json({
                status: 200,
                message: 'Success',
                foundFanPage,
            }); 

    } catch (error) {
        if(error === "noFanPageContent")  {
            return res.status(204).json({
                status: 204,
                message: 'No Content',
            });
        }

        if(error === "noAuthor")  {
            return res.status(204).json({
                status: 204,
                message: 'No Content Author',
            });
        }

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