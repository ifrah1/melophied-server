import jwtFunctions from '../auth/jwt.js';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        //check email and password is there
        if (username === '' || password === '') {
            throw 'Invalid credentials';
        };

        const foundUser = await db.User.findOne({ email });

        /* if no user */
        if (!foundUser) {
            throw 'Invalid credentials';
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (isMatch) {

            const signedJwt = await jwt.sign(
                {
                    /* PAYLOAD */
                    _id: foundUser._id,
                    firstName: foundUser.firstName
                },
                /* secret key */
                process.env.SUPER_SECRET_KEY || 'TESTARIF',
                {
                    /* OPTION  OBJ*/
                    expiresIn: '24h'
                }
            );

            return res.status(200).json({
                status: 200,
                message: 'Success',
                signedJwt
            });
        };

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });
    }
};


const authCtrls = {
    login
}

export default authCtrls;