import express from 'express';
const router = express.Router();
import * as coachController from '../Controller/coachController.js';


router.post('/register', coachController.coachregister);
router.post('/login', coachController.coachlogin);

export default router;
