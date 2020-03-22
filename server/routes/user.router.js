const router = require('express').Router()
const controller = require('../controllers/user.controller')

router.route('/').post(controller.createUser)

module.exports = router
