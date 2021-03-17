import encrypt from '../../auth/encrypt.js';

const usersData = [
    {
        username: "arif",
        email: "arif@arif.com",
        password: encrypt.hashPassword('1234'),
        firstName: "if",
        lastName: "rah",
        userTopArtists: ['greg', 'coldplay', 'raul']
    },

]

export default usersData;