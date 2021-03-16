import jwt from 'jsonwebtoken';

const createToken = (user) => {
    // payload for token
    // ask frontend team what they will need in payload
    const payload = {
        username: user.username,
        email: user.email,
        _id: user._id,
    };

    console.log('[jwt.js]', payload)

    const token = jwt.sign(
        payload,
        (process.env.TOKEN_SECRET || 'TESTFORNOW'),
        {
            expiresIn: '24' // will add env variable 
        }
    );
    console.log('TOken:', token)

    return token;
};

const decodeUser = (token) => {
    let decoded = jwt.verify(token, (process.env.TOKEN_SECRET || 'TESTFORNOW'))

    return decoded;
}


const jwtFunctions = {
    createToken,
    decodeUser
}

export default jwtFunctions;
