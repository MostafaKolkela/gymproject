const express = require('express')
const router = express.Router();
const authController = require('../controller/userAuthControlller')

router.route('/Register')
            .post(authController.Register)

router.route('/login')
            .post(authController.login)

module.exports = router