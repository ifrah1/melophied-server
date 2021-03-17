import bcrypt from 'bcrypt';

const hashPassword = (password) => {
    // create a salt for password
    const salt = bcrypt.genSaltSync(10); //change the 10 to a env variable in future

    // password hashed with salt
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

const bcryptFunctions = {
    hashPassword,
}

export default bcryptFunctions;
