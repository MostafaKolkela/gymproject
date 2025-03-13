import express from 'express';
const router = express.Router();
import * as authController from '../controller/userAuthControlller.js';

router.route('/Register')
            .post(authController.Register)

router.route('/login')
            .post(authController.login)

export default router