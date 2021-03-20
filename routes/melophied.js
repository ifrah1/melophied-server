import express from 'express';
import authenticateJWT from '../middleware/authenticate.js';

const router = express.Router();

import melophiedCtrls from '../controller/melophied.js';

//route: app.com/api/melophied/
router.get('/', (req, res) => {
    res.send('Hello MeLo')
});

//GET
//route: app.com/api/melophied/explore

//POST
//route: app.com/api/melophied/createFanPage

//GET
//route: app.com/api/melophied/getFanPage/:fanpageID
router.get('/getFanPage/:fanPageID', melophiedCtrls.getFanPage);
//PUT
//route: app.com/api/melophied/getFanPage/:fanpageID

//DELETE
//route: app.com/api/melophied/getFanPage/:fanpageID

//PUT
//route: app.com/api/melophied/upvote/:userid //discuss later 


export { router as melophied };