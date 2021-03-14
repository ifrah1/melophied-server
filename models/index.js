// DB connection
import '../config/db.connection.js';
// import [modelName] from './path';

const db = {
    User: require('./User'),
    FanPage: require('./FanPage'),
}

export default db;