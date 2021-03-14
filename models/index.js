// DB connection
import '../config/db.connection.js';
import User from './User';
import FanPage from './FanPage';

const db = {
    User,
    FanPage,
}

export default db;