import userQueries from '../DB/queries/user-queries.js';
import jwtFunctions from '../auth/jwt.js';
import encrypt from '../auth/encrypt.js';
import db from '../models/index.js';

const { User } = db;
//import user queries functions
const { verifyUser, usernameEmailExist, updateUser, verifyUsername } = userQueries;
//import jwt functions
const { createToken } = jwtFunctions;
// import encrypt functions
const { hashPassword } = encrypt;





const melophiedCtrls = {

}

export default melophiedCtrls;