import userQueries from '../DB/queries/user-queries.js';
import jwtFunctions from '../auth/jwt.js';
import encrypt from '../auth/encrypt.js';
import db from '../models/index.js';

const { User } = db;
//import user queries functions
const { verifyUser, usernameEmailExist } = userQueries;
//import jwt functions
const { createToken } = jwtFunctions;
// import encrypt functions
const { hashPassword } = encrypt;

// register new user
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, verifiedPassword } = req.body;

        // check if user exists already based on username or email
        const exists = await usernameEmailExist(username, email);

        // throw error if email or username exists
        if (exists) throw exists;

        // make user password and verify password matches just to be safe
        if (password !== verifiedPassword) throw 'passwordMismatch';

        // hash the password 
        const hashedPassword = hashPassword(verifiedPassword);

        // create the user in DB
        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        };
        // send user to db for creation
        await User.create(newUser);

        return res.status(201).json({
            status: 201,
            message: 'User was created successfully',
            requestedAt: new Date().toLocaleString(),
        });

    } catch (error) {
        console.log(error); //keep just incase if db error

        //user already exists error 
        if (error === "emailExists" || error === "usernameExists") {
            return res.status(409).json({
                status: 409,
                message: error,
            });
        }

        // password does not match error
        if (error === "passwordMismatch") {
            return res.status(401).json({
                status: 401,
                message: error,
            });
        }

        // all other errors 
        return res.status(500).json({
            status: 500,
            message: "Server error",
        });
    }
}

// login user
const login = async (req, res) => {
    try {
        // grab data from body
        const { username, password } = req.body;

        // check if credentials are empty 
        if (!username || !password) throw 'Invalid Credentials';

        // Verify if user credentials matches 
        const verifiedUser = await verifyUser(username, password);

        if (verifiedUser !== false) {
            // create the json web token 
            const userJWT = createToken(verifiedUser);

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

// send user data
const getUserData = async (req, res) => {
    try {
        //get user data minus the password
        let foundUser = await User.findById(req.user._id).select('-password');

        return res.status(200).json({
            status: 200,
            message: 'Success',
            foundUser
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });
    }
};

// update the user data
const updateUserData = async (req, res) => {
    try {
        
        
        return res.status(200).json({
            status: 200,
            message: 'Made it Update User Profile',
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });
    }
};

const authCtrls = {
    login,
    register,
    getUserData,
    updateUserData,
}

export default authCtrls;