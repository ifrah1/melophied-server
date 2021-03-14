import express from 'express';
const router = express.Router();

/* movies controllers */
import userCtrl from '../controllers/users.js';


// User Routes
router.get('/', userCtrl.index );

router.post('/create', userCtrl.createUser );
router.get('/:userId',  userCtrl.showUser );
router.put('/:userId/update', userCtrl.updateUser );
router.delete('/:userId/delete', userCtrl.destroy );


export { router as user };
