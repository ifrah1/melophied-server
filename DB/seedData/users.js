import encrypt from '../../auth/encrypt.js';

const usersData = [
    {
        username: "Arif",
        email: "arif@arif.com",
        password: encrypt.hashPassword('1234'),
    },

]

export default usersData;