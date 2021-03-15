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
                    // { 'email': username }
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


const userQueries = {
    verifyUser,
}

export default userQueries;