import express from 'express';
const router = express.Router();

// import melophiedCtrls from '../controller/melophiedCtrls.js';

//route: app.com/api/melophied/
router.get('/', (req, res) => {
    res.send('Hello MeLo')
});

export { router as melophied };