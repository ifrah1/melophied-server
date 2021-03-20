/* all models */
import db from '../../models/index.js';
/* users data */
import usersData from './users.js';
import fanPageData from './fanPage.js';
const { User, FanPage } = db;

/* function to add data into our data base */
const seedDatabase = async () => {
    try {
        await User.deleteMany({});

        const users = await db.User.insertMany(usersData);
        const fanPage = await db.FanPage.insertMany(fanPageData);

        console.log('created movies', users);

        process.exit()

    } catch (error) {
        return console.log(error);
    }
};

seedDatabase();