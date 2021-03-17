import express from 'express';
import authenticateJWT from '../middleware/authenticate.js';

const router = express.Router();

import authCtrls from '../controller/auth.js';

//route: app.com/api/auth/register
router.post('/register', authCtrls.register);

// route: app.com/api/auth/login
router.post('/login', authCtrls.login);

// route: app.com/api/auth/user
router.get('/user', authenticateJWT, authCtrls.getUserData);


export { router as auth };