// DB connection
import '../config/db.connection.js';
// import [modelName] from './path';
import User from './User.js';
import FanPage from './FanPage.js';

const db = {
    //Model Names
    User,
    FanPage
}

export default db;