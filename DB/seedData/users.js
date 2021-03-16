import encrypt from '../../auth/encrypt.js';

const usersData = [
    {
        firstName: "if",
        lastName: "rah",
        username: "Arif",
        email: "arif@arif.com",
        password: encrypt.hashPassword('1234'),
    },

]

export default usersData;