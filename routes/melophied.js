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
router.use('/explore', melophiedCtrls.exploreData);

//GET
//route: app.com/api/melophied/topFive
router.use('/topFive', melophiedCtrls.topFivePages);

//POST
//route: app.com/api/melophied/createFanPage
router.post('/fanPage/create', authenticateJWT, melophiedCtrls.createFanPage);

//GET
//route: app.com/api/melophied/getFanPage/:fanpageID
router.get('/fanPage/:fanPageID', melophiedCtrls.getFanPage);

//PUT
//route: app.com/api/melophied/getFanPage/:fanpageID

//DELETE
//route: app.com/api/melophied/getFanPage/:fanpageID
router.delete('/fanPage/:fanPageID/delete', authenticateJWT, melophiedCtrls.destroyFanPage );

//PUT
//route: app.com/api/melophied/upvote/:userid //discuss later 

export { router as melophied };