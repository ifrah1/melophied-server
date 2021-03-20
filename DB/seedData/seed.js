/* all models */
import db from '../../models/index.js';
/* users data */
import usersData from './users.js';
import fangPageData from './fanpage.js';

const { User, FanPage } = db;

/* function to add data into our data base */
const seedDatabase = async () => {
    try {
        await User.deleteMany({});

        const users = await db.User.insertMany(usersData);

        const fangpages = await db.FanPage.insertMany(fangPageData);

        console.log('created Users', users);
        console.log('created FanPages', fangpages);


        process.exit()

    } catch (error) {
        return console.log(error);
    }
};

seedDatabase();