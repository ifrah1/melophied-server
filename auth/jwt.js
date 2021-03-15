import jwt from 'jsonwebtoken';

const createToken = (user) => {
    // payload for token
    const payload = {
        username: user.username,
        email: user.email,
        _id: user._id,
    };

    const token = jwt.sign(
        payload,
        process.env.SECRET_KEY || 'TESTFORNOW',
        {
            expiresIn: '5h' // will add env variable 
        }
    );

    return token;
};

const decodeUser = (token) => {
    let decoded = jwt.verify(token, process.env.SECRET_KEY || 'TESTFORNOW')

    return decoded;
}


const jwtFunctions = {
    createToken,
    decodeUser
}

export default jwtFunctions;
