import bcrypt from 'bcrypt';
import db from '../../models/index.js';

const { User } = db;

const verifyUser = async (username, password) => {
    try {
        // Check in Db if email or username exists
        let foundUser = await User.findOne(
            {
                $or: [
                    { 'username': username },
                    { 'email': username }
                ]
            });

        if (!foundUser) throw 'Invalid Credentials';

        // if user is found then check to see if password is correct 
        const matchPassword = await bcrypt.compare(password, foundUser.password);

        // return founded user if user has valid credentials else return false  
        if (matchPassword) {
            return foundUser;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

const usernameEmailExist = async (username, email) => {
    try {
        // Check in Db if username exists
        let foundUser = await User.findOne({ username });
        if (foundUser) return 'usernameExists';

        // Check in Db if username exists
        foundUser = await User.findOne({ email });
        if (foundUser) return 'emailExists';

        return false;

    } catch (error) {
        return false;
    }
}

const updateUser = async (userID, newUserData) => {
    try {
        // Update the user information
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            {
                $set: {
                    ...newUserData
                }
            },
            {
                new: true
            }
        );

        return updatedUser;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// Checking the database to see if the new chosen username exists
const verifyUsername = async (username) => {
    try {
        // Check if the username already exists
        let foundUser = await User.findOne({ username });

        if (foundUser) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return true;
    }
}

const userQueries = {
    verifyUser,
    usernameEmailExist,
    updateUser,
    verifyUsername,
}

export default userQueries;