const express = require('express')
const userController = require('../controllers/userController')
const { userCheck } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login', userController.login_user)
router.post('/signup', userController.create_user)
router.get('/logout', userController.log_out)
router.get('/check', userCheck, userController.check_user)
// router.delete('/:id', userController.delete_user)
// router.patch('/:id', userController.update_user)

module.exports = router