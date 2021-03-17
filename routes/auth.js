import express from 'express';
const router = express.Router();

import authCtrls from '../controller/auth.js';

//route: app.com/api/auth/register
router.post('/register', authCtrls.register);

// route: app.com/api/auth/login
router.post('/login', authCtrls.login);


export { router as auth };