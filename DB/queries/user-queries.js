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
        console.log(error);
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
        console.log(error);
        return false;
    }
}

// const emailExist = async (email) => {
//     try {
//         // Check in Db if email exists
//         let foundUser = await User.findOne({ email });

//         if (foundUser) {
//             return true
//         } else {
//             return false
//         }

//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }


const userQueries = {
    verifyUser,
    usernameEmailExist,
}

export default userQueries;