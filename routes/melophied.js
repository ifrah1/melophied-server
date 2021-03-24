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
//route: app.com/api/melophied/fanPage/create
router.post('/fanPage/create', authenticateJWT, melophiedCtrls.createFanPage);

//GET
//route: app.com/api/melophied/fanPage/:fanPageID
router.get('/fanPage/:fanPageID', melophiedCtrls.getFanPage);

//PUT
//route: app.com/api/melophied/fanPage/update/:fanPageID
router.put('/fanPage/update/:fanPageID', authenticateJWT, melophiedCtrls.updateFanPage)

//DELETE
//route: app.com/api/melophied/fanPage/delete/:fanPageID
router.delete('/fanPage/delete/:fanPageID', authenticateJWT, melophiedCtrls.destroyFanPage );

//PUT
//route: app.com/api/melophied/fanPage/upvote/:fanPageID
router.put('/fanPage/upvote/:fanPageID', authenticateJWT, melophiedCtrls.updateUpvote);


export { router as melophied };