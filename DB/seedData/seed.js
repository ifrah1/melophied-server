/* all models */
import db from '../../models/index.js';
/* users data */
import usersData from './users.js';

const { User } = db;

/* function to add data into our data base */
const seedDatabase = async () => {
    try {
        await User.deleteMany({});

        const users = await db.User.insertMany(usersData);

        console.log('created movies', users);

        process.exit()

    } catch (error) {
        return console.log(error);
    }
};

seedDatabase();