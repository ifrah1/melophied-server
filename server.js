import express from 'express';
import logger from 'morgan';
import cors from 'cors';

/* Load env variables */
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3005;

/* Internal Module  */
import routes from './routes/index.js';

/* Setup Express App */
const app = express();

/* Mount middleware */
app.use(logger('dev'));
// use a static public folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 
  Use CORS to allow cross-origin access. 
  "CORS" stands for Cross-Origin Resource Sharing. 
  It allows you to make requests from one website to another website 
  in the browser, which is normally prohibited by another browser policy 
  called the Same-Origin Policy (SOP).
*/
app.use(cors());

/* Routes */
app.get('/', (req, res) => {
  res.send('Hello')
});

app.use('/api/auth', routes.auth);

/* App Listener */
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
