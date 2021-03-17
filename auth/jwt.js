import jwt from 'jsonwebtoken';

const createToken = (user) => {
    // payload for token
    // ask frontend team what they will need in payload
    const payload = {
        username: user.username,
        email: user.email,
        _id: user._id,
    };

    const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
            expiresIn: '24h' // will add env variable 
        }
    );

    return token;
};

const decodeUser = (token) => {
    let decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    return decoded;
}

const jwtFunctions = {
    createToken,
    decodeUser
}

export default jwtFunctions;
