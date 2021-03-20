import userQueries from '../DB/queries/user-queries.js';
import jwtFunctions from '../auth/jwt.js';
import encrypt from '../auth/encrypt.js';
import db from '../models/index.js';

const { User,FanPage } = db;
//import user queries functions
const { verifyUser, usernameEmailExist, updateUser, verifyUsername, fanPageExist } = userQueries;
//import jwt functions
const { createToken } = jwtFunctions;
// import encrypt functions
const { hashPassword } = encrypt;


const exploreData = (req, res) => {

    return res.send('Test');

}

//create FanPage
const createFanPage = async (req, res) => {
    console.log("start of create FanPage function")
    try {
        const { author,artist,pageTitle,pageBio,userTracks,userAlbums,userShows } = req.body;

        
        // throw error if pageTitle exists
        if ( !pageTitle || !artist || !author ) throw "missingRequiredFields";

        // create the user in DB
        const newFanPage = {
            author,
            artist,
            pageTitle,
            pageBio,
            userTracks,
            userAlbums,
            userShows,
        };
        // send FanPage to db for creation
        await FanPage.create(newFanPage);
        console.log("FanPage sent to DB")
        return res.status(201).json({
            status: 201,
            message: 'FanPage was created successfully',
            requestedAt: new Date().toLocaleString(),
        });

    } catch (error) {
        console.log(error); //keep just incase if db error

        //fan page missing required fields to create the page (either page title/artist/author)
        if ( error === "missingRequiredFields" ) {
            return res.status(409).json({
                status: 409,
                message: "Missing Required Fields",
                received: req.body
            });
        }

        // all other errors 
        return res.status(500).json({
            status: 500,
            message: "Server error",
        });
    }
}

const melophiedCtrls = {
    exploreData,
    createFanPage
}

export default melophiedCtrls;